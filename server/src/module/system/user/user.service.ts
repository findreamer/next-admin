import { In, Not } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetNowDate, ResultData, GenerateUUID, Uniq } from '@app/common/utils';
import { AllocatedListDto, CreateUserDto, ListUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/sys-user.entity';
import { LOGIN_TOKEN_EXPIRESIN, SYS_USER_TYPE } from '@app/common/constant';
import {
  CacheEnum,
  DataScopeEnum,
  DelFlagEnum,
  StatusEnum,
} from '@app/common/enum';

import { ClientInfoDto, LoginDto } from '@app/module/main/dto';
import { SysUserWithPostEntity } from './entities/user-with-post.entity';
import { SysUserWithRoleEntity } from './entities/user-with-role-entity';
import * as bcrypt from 'bcrypt';
import { SysDeptEntity } from '../dept/entities/dept.entity';
import {
  AuthUserCancelAllDto,
  AuthUserCancelDto,
  AuthUserSelectAllDto,
} from '../role/dto';
import { RoleService } from '../role/role.service';
import { DeptService } from '../dept/dept.service';
import { RedisService } from '@app/module/redis/redis.service';
import { SysPostEntity } from '../post/entities/post.entity';
import { SysRoleEntity } from '../role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SysUserWithPostEntity)
    private readonly sysUserWithPostEntityRepository: Repository<SysUserWithPostEntity>,
    @InjectRepository(SysUserWithRoleEntity)
    private readonly sysUserWithRoleEntityRepository: Repository<SysUserWithRoleEntity>,
    @InjectRepository(SysDeptEntity)
    private readonly sysDeptEntityRep: Repository<SysDeptEntity>,
    @InjectRepository(SysPostEntity)
    private readonly sysPostEntityRep: Repository<SysPostEntity>,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
    private readonly deptService: DeptService,
    private readonly redisService: RedisService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const loginDate = GetNowDate();

    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        bcrypt.genSaltSync(10),
      );
    }
    const res = await this.userRepository.save({
      ...createUserDto,
      loginDate,
      userType: SYS_USER_TYPE.CUSTOM,
    });

    // 存储关联信息-角色岗位
    const postEntity =
      this.sysUserWithPostEntityRepository.createQueryBuilder('post');
    const postValues = createUserDto.postIds.map((id) => ({
      useId: res.userId,
      postId: id,
    }));
    postEntity.insert().values(postValues).execute();

    const roleEntity =
      this.sysUserWithRoleEntityRepository.createQueryBuilder('role');
    const roleIds = createUserDto.roleIds.map((id) => ({
      roleId: id,
      userId: res.userId,
    }));
    roleEntity.insert().values(roleIds).execute();

    return ResultData.success();
  }

  /**
   * 用户列表, 这里不太明白dataScope的设计，后续再看看
   * @param query
   * @param user
   */
  async findAll(query: ListUserDto, user: any) {
    const entity = this.userRepository.createQueryBuilder('user');
    entity.where(`user.delFlag = :delFlag`, { delFlag: '0' });

    // 数据权限过滤
    if (user) {
      const roles: Array<any> = user.roles || [];
      const deptIds = [];
      let dataScopeAll = false;
      let dataScopeSlef = false;
      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        if (role.dataScope === DataScopeEnum.DATA_SCOPE_ALL) {
          dataScopeAll = true;
          break;
        } else if (role.dataScope === DataScopeEnum.DATA_SCOPE_CUSTOM) {
          const roleWithDeptIds = await this.roleService.findRoleWithDeptIds(
            role.roleId,
          );
          deptIds.push(...roleWithDeptIds);
        } else if (
          role.dataScope === DataScopeEnum.DATA_SCOPE_DEPT ||
          role.dataScope === DataScopeEnum.DATA_SCOPE_DEPT_AND_CHILD
        ) {
          const dataScopeWithDeptIds =
            await this.deptService.findDeptIdsByDataScope(
              user.deptId,
              role.dataScope,
            );
          deptIds.push(...dataScopeWithDeptIds);
        } else if (role.dataScope === DataScopeEnum.DATA_SCOPE_SELF) {
          dataScopeSlef = true;
        }
      }

      if (!dataScopeAll) {
        if (deptIds.length > 0) {
          entity.where(`user.deptId IN (:...deptIds)`, { deptIds });
        } else if (dataScopeSlef) {
          entity.where(`user.userId = :userId`, { userId: user.userId });
        }
      }
    }

    if (query.deptId) {
      const deptIds = await this.deptService.findDeptIdsByDataScope(
        +query.deptId,
        DataScopeEnum.DATA_SCOPE_DEPT_AND_CHILD,
      );
      entity.andWhere('user.deptId In (:...deptIds)', { deptIds });
    }

    if (query.userName) {
      entity.andWhere(`user.userName LIKE "%${query.userName}%"`);
    }

    if (query.phonenumber) {
      entity.andWhere(`user.phonenumber LIKE "%${query.phonenumber}%"`);
    }

    if (query.status) {
      entity.andWhere('user.status = :status', { status: query.status });
    }

    if (query.params?.beginTime && query.params?.endTime) {
      entity.andWhere('user.createTime BETWEEN :start AND :end', {
        start: query.params.beginTime,
        end: query.params.endTime,
      });
    }

    entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize);
    //联查部门详情
    entity.leftJoinAndMapOne(
      'user.dept',
      SysDeptEntity,
      'dept',
      'dept.deptId = user.deptId',
    );

    const [list, total] = await entity.getManyAndCount();

    return ResultData.success({
      list,
      total,
    });
  }

  /**
   * 部门树
   */
  async deptTree() {
    const tree = await this.deptService.deptTree();
    return ResultData.success(tree);
  }

  /**
   * 获取用户角色和岗位
   * @returns
   */
  async findPostAndRoleAll() {
    const posts = await this.sysPostEntityRep.find({
      where: {
        delFlag: '0',
      },
    });
    const roles = await this.roleService.findRoles({
      where: {
        delFlag: '0',
      },
    });

    return ResultData.success({
      posts,
      roles,
    });
  }

  /**
   * 获取角色详情
   * @param userId
   */
  async authRole(userId: number) {
    const allRoles = await this.roleService.findRoles({
      where: {
        delFlag: '0',
      },
    });

    const user = await this.userRepository.findOne({
      where: {
        delFlag: '0',
        userId,
      },
    });

    const dept = await this.sysDeptEntityRep.findOne({
      where: {
        delFlag: '0',
        deptId: user.deptId,
      },
    });

    user['dept'] = dept;
    const roleIds = await this.getRoleIds([userId]);
    user['roles'] = allRoles.filter((item) => {
      if (roleIds.includes(item.roleId)) {
        item['flag'] = true;
      }
      return true;
    });
  }

  /**
   * 更新用户角色信息
   * @param query ?roleIds=1,2,3&userId=abc
   * @returns
   */
  async updateAuthRole(query) {
    const roleIds = query.roleIds.split(',');
    if (roleIds?.length) {
      // 用户已有角色，删除所有关联角色
      const hasRoleId = await this.sysUserWithRoleEntityRepository.findOne({
        where: {
          userId: query.uerId,
        },
        select: ['roleId'],
      });

      if (hasRoleId) {
        await this.sysUserWithRoleEntityRepository.delete({
          userId: query.userId,
        });
      }

      const roleEntity =
        this.sysUserWithRoleEntityRepository.createQueryBuilder('roleEntity');
      const roleValues = roleIds.map((id) => {
        return {
          userIs: query.useId,
          roleId: id,
        };
      });

      roleEntity.insert().values(roleValues).execute();
    }

    return ResultData.success();
  }

  async findOne(userId: number) {
    const data = await this.userRepository.findOne({
      where: {
        delFlag: '0',
        userId: userId,
      },
    });

    const dept = await this.sysDeptEntityRep.findOne({
      where: {
        delFlag: '0',
        deptId: data.deptId,
      },
    });
    data['dept'] = dept;

    const postList = await this.sysUserWithPostEntityRepository.find({
      where: {
        userId: userId,
      },
      select: ['postId'],
    });

    const postIds = postList.map((item) => item.postId);
    const allPosts = await this.sysPostEntityRep.find({
      where: {
        delFlag: '0',
      },
    });
    const roleIds = await this.getRoleIds([userId]);
    const allRoles = await this.roleService.findRoles({
      where: {
        delFlag: '0',
      },
    });

    data['roles'] = allRoles.filter((item) => roleIds.includes(item.roleId));

    return ResultData.success({
      data,
      postIds,
      posts: allPosts,
      roles: allRoles,
      roleIds,
    });
  }

  async login(user: LoginDto, clientInfo: ClientInfoDto) {
    const data = await this.userRepository.findOne({
      where: {
        userName: user.username,
      },
      select: ['password', 'userId'],
    });

    if (!(data && bcrypt.compareSync(user.password, data.password))) {
      return ResultData.fail(500, '帐号或密码错误');
    }

    const userData = await this.getUserInfo(data.userId);
    if (userData.delFlag === DelFlagEnum.DELETE) {
      return ResultData.fail(500, '账户已被禁用，如需正常使用请联系管理员');
    }

    if (userData.status === StatusEnum.STOP) {
      return ResultData.fail(500, '账户已被停用，如需正常使用请联系管理员');
    }

    const loginDate = new Date();
    // 更新登陆时间
    await this.userRepository.update(
      { userId: data.userId },
      {
        loginDate,
      },
    );

    const uuid = GenerateUUID();
    const token = this.createToken({ uuid, userId: userData.userId });
    const permissions = await this.getUserPermissions(userData.userId);
    const deptData = await this.sysDeptEntityRep.findOne({
      where: {
        deptId: userData.deptId,
      },
      select: ['deptName'],
    });
    userData['deptName'] = deptData.deptName || '';

    const roles = userData.roles.map((item) => item.roleKey);
    const metaData = {
      browser: clientInfo.browser,
      ipaddr: clientInfo.ipaddr,
      loginLocation: clientInfo.loginLocation,
      loginTime: loginDate,
      os: clientInfo.os,
      permissions,
      roles,
      token: uuid,
      user: userData,
      userId: userData.userId,
      username: userData.userName,
      ddeptId: userData.deptId,
    };

    await this.redisService.set(
      `${CacheEnum.LOGIN_TOKEN_KEY}${uuid}`,
      metaData,
      LOGIN_TOKEN_EXPIRESIN,
    );
    return ResultData.success({ token }, '登陆成功');
  }

  /** 通过用户id获取角色id */
  async getRoleIds(userIds: Array<number>) {
    const roleList = await this.sysUserWithRoleEntityRepository.find({
      where: {
        userId: In(userIds),
      },
    });
    const roleIds = roleList.map((item) => item.roleId);
    return Uniq(roleIds) as number[];
  }

  /**
   * 获取权限列表
   * @param userId 用户id
   * @returns
   */
  async getUserPermissions(userId: number) {
    // 超级管理员
    if (userId === 1) {
      return ['*:*:*'];
    }
    const roleIds = await this.getRoleIds([userId]);
    const list = await this.roleService.getPermissionsByRoleIds(roleIds);
    const permissions = (
      Uniq(list.map((item) => item.perms)) as string[]
    ).filter((item) => item.trim());
    return permissions;
  }
  /**
   * 获取用户详情，todo: 补充部门信息，角色信息
   * @param userId
   * @returns
   */
  async getUserInfo(userId: number) {
    const entity = this.userRepository.createQueryBuilder('user');

    entity.where({
      userId: userId,
      delFlag: DelFlagEnum.NORMAL,
    });

    // 联查部门详情
    entity.leftJoinAndMapOne(
      'user.dept',
      SysDeptEntity,
      'dept',
      'dept.deptId = user.deptId',
    );
    const roleIds = await this.getRoleIds([userId]);
    const roles = await this.roleService.findRoles({
      where: {
        delFlag: '0',
        roleId: In(roleIds),
      },
    });

    const postIds = (
      await this.sysUserWithPostEntityRepository.find({
        where: {
          userId: userId,
        },
        select: ['postId'],
      })
    ).map((item) => item.postId);

    const posts = await this.sysPostEntityRep.find({
      where: {
        delFlag: '0',
        postId: In(postIds),
      },
    });

    const data = (await entity.getOne()) as UserEntity & {
      roles: SysRoleEntity[];
      posts: SysPostEntity[];
    };
    data['roles'] = roles;
    data['posts'] = posts;

    return data;
  }

  /**
   * 生成token
   * @param payload 数据声明
   * @returns 令牌
   */
  createToken(payload: { uuid: string; userId: number }): string {
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  /**
   * 从令牌中获取数据
   * @param token
   * @returns
   */
  async parseToken(token: string) {
    try {
      if (!token) return null;

      const payload = await this.jwtService.verifyAsync<any>(
        token.replace('Bearer ', ''),
      );
      return payload;
    } catch (error) {
      return null;
    }
  }

  /**
   * 获取角色已分配用户
   * @param query
   */
  async allocatedList(query: AllocatedListDto) {
    const roleWithRoleList = await this.sysUserWithRoleEntityRepository.find({
      where: {
        roleId: +query.roleId,
      },
      select: ['userId'],
    });

    if (roleWithRoleList.length === 0) {
      return ResultData.success({
        list: [],
        total: 0,
      });
    }
    const userIds = roleWithRoleList.map((item) => item.userId);
    const entity = this.userRepository.createQueryBuilder('user');
    entity.where(`user.delFlag = :delFlag`, { delFlag: '0' });
    entity.andWhere(`user.status = :status`, { status: '0' });
    entity.andWhere(`user.userIn In (:...userIds)`, { userIds });

    if (query.userName) {
      entity.andWhere(`user.userName LIKE :userName`, {
        userName: `"%${query.userName}%"`,
      });
    }

    if (query.phonenumber) {
      entity.andWhere(`user.phonenumber LIKE :phonenumber`, {
        phonenumber: `"%${query.phonenumber}%"`,
      });
    }

    const { pageNum, pageSize } = query;
    entity.skip(pageSize * (pageNum - 1)).take(pageSize);
    // 联查部门详情
    entity.leftJoinAndMapOne(
      'user.dept',
      SysDeptEntity,
      'dept',
      'dept.deptId = user.deptId',
    );
    const [list, total] = await entity.getManyAndCount();
    return ResultData.success({
      list,
      total,
    });
  }

  /**
   * 获取角色未分配用户
   * @param allocatedListDto
   */
  async unallocatedList(allocatedListDto: AllocatedListDto) {
    const roleWithRoleList = await this.sysUserWithRoleEntityRepository.find({
      where: {
        roleId: +allocatedListDto.roleId,
      },
      select: ['userId'],
    });

    const userIds = roleWithRoleList.map((item) => item.userId);
    const entity = this.userRepository.createQueryBuilder('user');
    entity.where(`user.delFlag = :delFlag`, {
      delFlag: '0',
    });
    entity.andWhere(`user.status = :status`, { status: '0' });
    entity.andWhere({
      userId: Not(In(userIds)),
    });

    if (allocatedListDto.userName) {
      entity.andWhere(`user.userName LIKE "%${allocatedListDto.userName}%"`);
    }

    if (allocatedListDto.phonenumber) {
      entity.andWhere(
        `user.phonenumber LIKE "%%${allocatedListDto.phonenumber}"`,
      );
    }

    const { pageNum, pageSize } = allocatedListDto;
    entity.skip(pageSize * (pageNum - 1)).take(pageSize);

    // 联查部门详情
    entity.leftJoinAndMapOne(
      'user.dept',
      SysDeptEntity,
      'dept',
      'dept.deptId = user.deptId',
    );
  }

  /**
   * 用户解绑角色
   * @param data
   */
  async authUserCancel(data: AuthUserCancelDto) {
    const res = await this.sysUserWithRoleEntityRepository.delete({
      roleId: data.roleId,
      userId: data.userId,
    });

    return ResultData.success(res);
  }

  /**
   * 用户批量解绑角色
   * @param data
   */
  async authUserCancelAll(data: AuthUserCancelAllDto) {
    const userIds = (data.userIds || '').split(',').map((id) => Number(id));
    const res = await this.sysUserWithRoleEntityRepository.delete({
      roleId: data.roleId,
      userId: In(userIds),
    });

    return ResultData.success(res);
  }

  /**
   * 用户批量绑定角色
   * @param data AuthUserSelectAllDto
   */
  async authUserSelectAll(data: AuthUserSelectAllDto) {
    const userIds = (data.userIds || '').split(',');
    const entities = userIds.map((userId) => {
      const sysUserWithRoleEntity = new SysUserWithRoleEntity();
      return Object.assign(sysUserWithRoleEntity, {
        userId: Number(userId),
        roleId: Number(data.roleId),
      });
    });

    const res = await this.sysUserWithRoleEntityRepository.save(entities);
    return ResultData.success(res);
  }
}
