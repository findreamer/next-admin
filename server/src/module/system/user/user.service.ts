import { In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetNowDate, ResultData, GenerateUUID, Uniq } from '@app/common/utils';
import { CreateUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/sys-user.entity';
import { SYS_USER_TYPE } from '@app/common/constant';
import { DelFlagEnum, StatusEnum } from '@app/common/enum';

import { ClientInfoDto, LoginDto } from '@app/module/main/dto';
import { SysUserWithPostEntity } from './entities/user-with-post.entity';
import { SysUserWithRoleEntity } from './entities/user-with-role-entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SysUserWithPostEntity)
    private readonly sysUserWithPostEntityRepository: Repository<SysUserWithPostEntity>,
    @InjectRepository(SysUserWithRoleEntity)
    private readonly sysUserWithRoleEntityRepository: Repository<SysUserWithRoleEntity>,
    private readonly jwtService: JwtService,
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
    // 待完成postEntity、roleEntity

    return ResultData.success();
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
    const permissions = this.getUserPermissions(userData.userId);
  }

  async getRoleIds(userIds: Array<number>) {
    const roleList = await this.sysUserWithRoleEntityRepository.find({
      where: {
        userId: In(userIds),
      },
    });
    const roleIds = roleList.map((item) => item.roleId);
    return Uniq(roleIds);
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
    // const list = await this.roleService
  }
  /**
   * 获取用户详情，todo: 补充部门信息，角色信息
   * @param userId
   * @returns
   */
  async getUserInfo(userId: number): Promise<UserEntity> {
    const entity = this.userRepository.createQueryBuilder('user');

    entity.where({
      userId: userId,
      delFlag: DelFlagEnum.NORMAL,
    });

    // 联查部门详情
    // entity.leftJoinAndMapOne('user.dept', )
    const data = await entity.getOne();
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
}
