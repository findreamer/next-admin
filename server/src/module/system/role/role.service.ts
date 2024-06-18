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
import { ResultData } from '@app/common/utils';
import { SysRoleWithDeptEntity } from './entities/role-width-dept.entity';
import { SysRoleWithMenuEntity } from './entities/role-width-menu.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(SysRoleEntity)
    private readonly sysRoleRepository: Repository<SysRoleEntity>,
    @InjectRepository(SysRoleWithDeptEntity)
    private readonly sysRoleWithDeptEntityRep: Repository<SysRoleWithDeptEntity>,
    @InjectRepository(SysRoleWithMenuEntity)
    private readonly sysRoleWithMenuEntityRep: Repository<SysRoleWithMenuEntity>,
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

  async deptTree(roleId: number) {}
}
