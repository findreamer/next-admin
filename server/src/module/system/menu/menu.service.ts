import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysMenuEntity } from './entities/menu.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateMenuDto, ListMenuDto } from './dto';
import { ResultData } from '@app/common/utils';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(SysMenuEntity)
    private readonly sysMenuEntityRep: Repository<SysMenuEntity>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const res = await this.sysMenuEntityRep.save(createMenuDto);
    return ResultData.success(res);
  }

  findMany(where: FindManyOptions<SysMenuEntity>) {
    return this.sysMenuEntityRep.find(where);
  }

  async findAll(query: ListMenuDto) {
    const entity = this.sysMenuEntityRep.createQueryBuilder('entity');
    entity.where(`entity.delFlag = :delFlag`, { delFlag: '0' });

    if (query.menuName) {
      entity.andWhere(`entity.menuName LIKE :menuName`, {
        menuName: `%${query.menuName}%`,
      });
    }

    if (query.status) {
      entity.andWhere(`entity.status = :status`, { status: query.status });
    }
    const res = await entity.getMany();
    return ResultData.success(res);
  }
}
