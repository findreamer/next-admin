import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SysRoleEntity } from './entities/role.entity';
import {
  ChangeStatusDto,
  CreateRoleDto,
  ListRoleDto,
  UpdateRoleDto,
} from './dto';
import { ListToTree, ResultData } from '@app/common/utils';
import { SysRoleWithDeptEntity } from './entities/role-width-dept.entity';
import { SysRoleWithMenuEntity } from './entities/role-width-menu.entity';
import { SysDeptEntity } from '../dept/entities/dept.entity';
import { DataScopeEnum } from '@app/common/enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(SysRoleEntity)
    private readonly sysRoleRepository: Repository<SysRoleEntity>,
    @InjectRepository(SysRoleWithDeptEntity)
    private readonly sysRoleWithDeptEntityRep: Repository<SysRoleWithDeptEntity>,
    @InjectRepository(SysRoleWithMenuEntity)
    private readonly sysRoleWithMenuEntityRep: Repository<SysRoleWithMenuEntity>,
    @InjectRepository(SysDeptEntity)
    private readonly sysDeptEntityRep: Repository<SysDeptEntity>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const res = await this.sysRoleRepository.save(createRoleDto);
    return ResultData.success(res);
  }

  async findAll(query: ListRoleDto) {
    const entity = this.sysRoleRepository.createQueryBuilder('entity');
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' });
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' });

    if (query.roleName) {
      entity.andWhere(`entity.roleName LIKE "${query.roleName}"`);
    }

    if (query.roleKey) {
      entity.andWhere(`entity.roleKey LIKE "${query.roleKey}"`);
    }

    if (query.roleId) {
      entity.andWhere(`entity.roleId = :roleId`, { roleId: query.roleId });
    }

    if (query.status) {
      entity.andWhere(`entity.status = :status`, { status: query.status });
    }

    if (query.params?.beginTime && query.params?.endTime) {
      entity.andWhere(`entity.createTime BETWEEN :start AND :end`, {
        start: query.params.beginTime,
        end: query.params.endTime,
      });
    }

    entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize);
    const [list, total] = await entity.getManyAndCount();
    return ResultData.success({
      list,
      total,
      pageSize: query.pageSize,
      pageNum: query.pageNum,
    });
  }

  async findOne(roleId: number) {
    const res = await this.sysRoleRepository.findOne({ where: { roleId } });
    return ResultData.success(res);
  }

  async update(updateRoleDto: UpdateRoleDto) {
    // todo 更新关联表数据

    const res = await this.sysRoleRepository.update(
      { roleId: updateRoleDto.roleId },
      updateRoleDto,
    );
    return ResultData.success(res);
  }

  async changeStatus(changeStatusDto: ChangeStatusDto) {
    const res = await this.sysRoleRepository.update(
      { roleId: changeStatusDto.roleId },
      { status: changeStatusDto.status },
    );
    return ResultData.success(res);
  }

  async remove(roleIds: number[]) {
    const res = await this.sysRoleRepository.update(
      { roleId: In(roleIds) },
      {
        delFlag: '1',
      },
    );

    return ResultData.success(res);
  }

  async deptTree(roleId: number) {
    const res = await this.sysDeptEntityRep.find({
      where: {
        delFlag: '0',
      },
    });

    const tree = ListToTree(
      res,
      (m) => m.deptId,
      (m) => m.deptName,
    );
    const deptIds = await this.sysRoleWithDeptEntityRep.find({
      where: {
        roleId,
      },
      select: ['deptId'],
    });
    const checkedKeys = deptIds.map((item) => item.deptId);
    return ResultData.success({
      depts: tree,
      checkedKeys,
    });
  }

  // 更新角色信息以及关联角色-部门信息
  async dataScope(updateRoleDto: UpdateRoleDto) {
    const hasId = await this.sysRoleWithDeptEntityRep.findOne({
      where: {
        roleId: updateRoleDto.roleId,
      },
      select: ['roleId'],
    });

    // 角色已有权限 或者 非自定义权限，先删除权限关联
    if (hasId || updateRoleDto.dataScope === DataScopeEnum.DATA_SCOPE_CUSTOM) {
      await this.sysRoleWithDeptEntityRep.delete({
        roleId: updateRoleDto.roleId,
      });
    }

    const entity = this.sysRoleWithDeptEntityRep.createQueryBuilder('entity');
    const values = updateRoleDto.deptIds.map((id) => {
      return {
        roleId: updateRoleDto.roleId,
        deptId: id,
      };
    });

    // 批量插入数据
    entity.insert().values(values).execute();

    delete updateRoleDto.deptIds;

    const res = await this.sysRoleRepository.update(
      { roleId: updateRoleDto.roleId },
      updateRoleDto,
    );
    return ResultData.success(res);
  }

  /**
   * 根据角色获取权限列表
   */
  async getPermissionsByRoleIds(roleIds: number[]) {
    const list = await this.sysRoleWithMenuEntityRep.find({
      where: {
        roleId: In(roleIds),
      },
      select: ['menuId'],
    });

    const menuIds = list.map((item) => item.menuId);
    const permission = await this.menuService.findMany({
      where: {
        delFlag: '0',
        status: '0',
        menuId: In(menuIds),
      },
    });

    return permission;
  }

  /**
   * 根据角色Id异步查找与之关联的部门ID列表
   * @param roleId - 角色的ID，用于查询与该角色关联的部门。
   * @returns 返回一个Promise，该Promise解析为一个部门ID的数组。
   */
  async findRoleWithDeptIds(roleId: number) {
    const res = await this.sysRoleWithDeptEntityRep.find({
      where: {
        roleId: roleId,
      },
      select: ['deptId'],
    });

    return res.map((item) => item.deptId);
  }
}
