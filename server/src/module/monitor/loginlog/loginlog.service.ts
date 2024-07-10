import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitorLoginlogEntity } from './entities/loginlog.entity';
import { ListLoginlogDto } from './dto';
import { ResultData } from '@app/common/utils';

@Injectable()
export class LoginlogService {
  constructor(
    @InjectRepository(MonitorLoginlogEntity)
    private readonly monitorLoginlogEntityRep: Repository<MonitorLoginlogEntity>,
  ) {}

  async findAll(query: ListLoginlogDto) {
    const entity = this.monitorLoginlogEntityRep.createQueryBuilder('entity');
    entity.where(`entity.delFlag = :delFlag`, { delFlag: '0' });

    if (query.ipaddr) {
      entity.andWhere(`entity.ipaddr LIKE :ipaddr`, {
        ipaddr: `%${query.ipaddr}%`,
      });
    }

    if (query.userName) {
      entity.andWhere(`entity.userName LIKE :userName`, {
        userName: `%${query.userName}%`,
      });
    }

    if (query.status) {
      entity.andWhere(`entity.status = :status`, {
        status: query.status,
      });
    }

    if (query.params?.beginTime && query.params?.endTime) {
      entity.andWhere(`entity.loginTime BETWEEN :beginTime AND :endTime`, {
        beginTime: query.params.beginTime,
        endTime: query.params.endTime,
      });
    }

    if (query.orderByColumn && query.isAsc) {
      const key = query.isAsc === 'ascending' ? 'ASC' : 'DESC';
      entity.orderBy(`entity.${query.orderByColumn}`, key);
    }

    entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize);
    const [list, total] = await entity.getManyAndCount();
    return ResultData.success({ list, total });
  }
}
