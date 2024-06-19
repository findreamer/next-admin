import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SySDeptEntity } from './entities/dept.entity';
import { Repository } from 'typeorm';
import { CreateDeptDto, ListDeptDto } from './dto';
import { ResultData } from '@app/common/utils';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(SySDeptEntity)
    private readonly sysyDeptEntityRep: Repository<SySDeptEntity>,
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
}
