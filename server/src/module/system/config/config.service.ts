import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysConfigEntity } from './entities/config.entity';
import { ResultData } from '@app/common/utils';
import { CreateConfigDto } from './dto';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(SysConfigEntity)
    private readonly sysConfigEntityRep: Repository<SysConfigEntity>,
  ) {}

  async create(createConfigDto: CreateConfigDto) {
    await this.sysConfigEntityRep.save(createConfigDto);
    return ResultData.success();
  }
}
