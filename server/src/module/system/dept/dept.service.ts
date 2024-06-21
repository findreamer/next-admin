import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysDeptEntity } from './entities/dept.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateDeptDto, ListDeptDto, UpdateDeptDto } from './dto';
import { ResultData, ListToTree } from '@app/common/utils';
import { DataScopeEnum } from '@app/common/enum';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(SysDeptEntity)
    private readonly sysyDeptEntityRep: Repository<SysDeptEntity>,
  ) {}

  async create(createDeptDto: CreateDeptDto) {
    if (createDeptDto.parentId) {
      const parent = await this.sysyDeptEntityRep.findOne({
        where: {
          deptId: createDeptDto.parentId,
          delFlag: '0',
        },
        select: ['ancestors'],
      });

      if (!parent) {
        return ResultData.fail(500, '父级部门不存在');
      }
      const ancestors = parent.ancestors
        ? `${parent.ancestors},${createDeptDto.parentId}`
        : `${createDeptDto.parentId}`;

      Object.assign(createDeptDto, { ancestors });
    }
    const res = await this.sysyDeptEntityRep.save(createDeptDto);

    return ResultData.success(res);
  }

  async findAll(query: ListDeptDto) {
    const entity = this.sysyDeptEntityRep.createQueryBuilder('entity');
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' });

    if (query.deptName) {
      entity.andWhere(`entity.deptName LIKE "%${query.deptName}%"`);
    }

    if (query.status) {
      entity.where(`entity.status = :status`, { status: query.status });
    }

    const res = await entity.getMany();
    return ResultData.success(res);
  }

  async findOne(deptId: number) {
    const res = await this.sysyDeptEntityRep.findOne({
      where: {
        deptId,
        delFlag: '0',
      },
    });
    return ResultData.success(res);
  }

  async update(updateDeptDto: UpdateDeptDto) {
    // 如果修改父级部门，则需要拿到父级部门的 祖籍列表
    const { parentId } = updateDeptDto;
    if (parentId && parentId != 0) {
      const parent = await this.sysyDeptEntityRep.findOne({
        where: {
          deptId: parentId,
          delFlag: '0',
        },
        select: ['ancestors'],
      });

      if (!parent) {
        return ResultData.fail(500, '父级部门不存在');
      }
      const ancestors = parent.ancestors
        ? `${parent.ancestors},${parentId}`
        : `${parentId}`;
      Object.assign(updateDeptDto, { ancestors });
    }

    const res = await this.sysyDeptEntityRep.update(
      {
        deptId: updateDeptDto.deptId,
      },
      updateDeptDto,
    );
    return ResultData.success(res);
  }

  async remove(deptId: number) {
    const res = await this.sysyDeptEntityRep.update(
      {
        deptId: deptId,
      },
      {
        delFlag: '1',
      },
    );

    return ResultData.success(res);
  }

  async findListExclude(id: number) {
    const data = await this.sysyDeptEntityRep.find({
      where: {
        delFlag: '0',
      },
    });

    // 需排出ancestors 中不出现id的数据
    const res = data.filter((dept) => dept.ancestors.includes(String(id)));
    return ResultData.success(res);
  }

  /**
   * 根据数据权限范围和部门ID查询部门ID列表
   * @param deptId 部门ID，表示要查询的部门
   * @param dataScope 数据权限范围，决定查询的部门范围
   * @returns 返回一个部门ID数组，根据数据权限范围决定返回的部门ID集合。
   */
  async findDeptIdsByDataScope(deptId: number, dataScope: DataScopeEnum) {
    try {
      // 创建部门实体的查询构建器
      const entity = this.sysyDeptEntityRep.createQueryBuilder('dept');
      // 筛选出删除标志为未删除的部门
      entity.where(`dept.delFlag = :delFlag`, { delFlag: '0' });

      // 根据不同的数据权限范围添加不同的查询条件
      if (dataScope === DataScopeEnum.DATA_SCOPE_DEPT) {
        // 如果是本部门数据权限，则只能查询指定部门
        this.addQueryForDeptDataScope(entity, deptId);
      } else if (dataScope === DataScopeEnum.DATA_SCOPE_DEPT_AND_CHILD) {
        this.andQueryForDeptAndChildDataScope(entity, deptId);
      } else if (dataScope === DataScopeEnum.DATA_SCOPE_SELF) {
        // 如果是仅查询本人数据权限，则不查询任何部门，直接返回空数组
        return [];
      }

      // 执行查询并获取结果
      const list = await entity.getMany();

      return list.map((dept) => dept.deptId);
    } catch (error) {
      console.error('Failed to query department IDs:', error);
      throw new Error('Querying department IDs failed');
    }
  }

  /**
   * 添加查询条件以适应本部门数据权限范围
   * @param queryBuilder 查询构建实例
   * @param deptId 部门ID
   */
  private addQueryForDeptDataScope(
    queryBuilder: SelectQueryBuilder<SysDeptEntity>,
    deptId: number,
  ) {
    queryBuilder.andWhere(`dept.deptId = :deptId`, { deptId });
  }

  /**
   * 添加查询条件以适应部门及自部门数据权限范围
   * @param queryBuilder 查询构建实例
   * @param deptId 部门ID
   */
  private andQueryForDeptAndChildDataScope(
    queryBuilder: SelectQueryBuilder<SysDeptEntity>,
    deptId: number,
  ) {
    // 使用参数化查询以防止SQL注入
    queryBuilder
      .andWhere(`dept.ancestors LIKE :ancestors`, {
        ancestors: `%${deptId}%`,
      })
      .orWhere(`dept.deptId = :deptId`, { deptId });
  }

  /**
   * 获取部门树
   * @returns
   */
  async deptTree() {
    const res = await this.sysyDeptEntityRep.find({
      where: {
        delFlag: '0',
      },
    });

    const tree = ListToTree(
      res,
      (m) => m.deptId,
      (m) => m.deptName,
    );

    return tree;
  }
}
