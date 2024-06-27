import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysMenuEntity } from './entities/menu.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateMenuDto } from './dto';
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
}
