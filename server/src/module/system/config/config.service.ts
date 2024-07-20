import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysConfigEntity } from './entities/config.entity';
import { ResultData } from '@app/common/utils';
import { CreateConfigDto, ListConfigDto } from './dto';
import { RedisService } from '@app/module/redis/redis.service';
import { CacheEnum } from '@app/common/enum';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(SysConfigEntity)
    private readonly sysConfigEntityRep: Repository<SysConfigEntity>,
    private readonly redisService: RedisService,
  ) {}

  async create(createConfigDto: CreateConfigDto) {
    await this.sysConfigEntityRep.save(createConfigDto);
    return ResultData.success();
  }

  async findAll(query: ListConfigDto) {
    const entity = this.sysConfigEntityRep.createQueryBuilder('entity');
    entity.where(`entity.delFlag = :delFlag`, { delFlag: '0' });

    if (query.configName) {
      entity.andWhere(`entity.configName LIKE :configName`, {
        configName: query.configName,
      });
    }
    if (query.configKey) {
      entity.andWhere(`entity.configKey LIKE :configKey`, {
        configKey: query.configKey,
      });
    }

    if (query.configType) {
      entity.andWhere(`entity.configType = :configType`, {
        configType: query.configType,
      });
    }

    if (query.params?.beginTime && query.params?.endTime) {
      entity.andWhere('entity.createTime BETWEEN :start AND :end', {
        start: query.params.beginTime,
        end: query.params.endTime,
      });
    }

    if (query.pageSize && query.pageNum) {
      entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize);
    }

    const [list, total] = await entity.getManyAndCount();
    return ResultData.success({
      list,
      total,
    });
  }

  async findOne(id: number) {
    const configData = await this.sysConfigEntityRep.findOne({
      where: {
        configId: id,
      },
    });
    return ResultData.success(configData);
  }

  async findOneByConfigKey(configKey: string) {
    const configData = await this.getConfigValue(configKey);
    return ResultData.success(configData);
  }

  async getConfigValue(configKey: string): Promise<string> {
    const cacheData = await this.redisService.get(
      `${CacheEnum.SYS_CONFIG_KEY}${configKey}`,
    );
    if (cacheData) {
      return cacheData;
    }

    const configData = await this.sysConfigEntityRep.findOne({
      where: {
        configKey,
      },
    });

    await this.redisService.set(
      `${CacheEnum.SYS_CONFIG_KEY}${configKey}`,
      configData.configValue,
    );
    return configData.configValue;
  }
}
