import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SysConfigEntity } from './entities/config.entity';
import { ResultData } from '@app/common/utils';
import { CreateConfigDto, ListConfigDto, UpdateConfigDto } from './dto';
import { RedisService } from '@app/module/redis/redis.service';
import { CacheEnum } from '@app/common/enum';
import { Response } from 'express';
import { ExportTable } from '@app/common/utils/export';

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

  async update(updateConfigDto: UpdateConfigDto) {
    const res = await this.sysConfigEntityRep.update(
      {
        configId: updateConfigDto.configId,
      },
      updateConfigDto,
    );

    return ResultData.success(res);
  }

  async remove(configIds: number[]) {
    const list = await this.sysConfigEntityRep.find({
      where: {
        configId: In(configIds),
        delFlag: '0',
      },
      select: ['configKey', 'configType'],
    });

    const item = list.find((item) => item.configType === 'Y');
    if (item) {
      return ResultData.fail(500, `内置参数【${item.configKey}】不能删除`);
    }

    const res = await this.sysConfigEntityRep.update(
      {
        configId: In(configIds),
      },
      {
        delFlag: '1',
      },
    );
    return ResultData.success(res);
  }

  async export(res: Response, body: ListConfigDto) {
    delete body.pageNum;
    delete body.pageSize;
    const list = await this.findAll(body);
    const options = {
      sheetName: '参数管理',
      data: list.data.list,
      header: [
        { title: '参数主键', dataIndex: 'configId' },
        { title: '参数名称', dataIndex: 'configName' },
        { title: '参数键名', dataIndex: 'configKey' },
        { title: '参数键值', dataIndex: 'configValue' },
        { title: '系统内置', dataIndex: 'configType' },
      ],
      dictMap: {
        configType: {
          Y: '是',
          N: '否',
        },
      },
    };

    ExportTable(options, res);
  }

  async refreshCache() {
    const list = await this.sysConfigEntityRep.find({
      where: {
        delFlag: '0',
      },
    });
    list.forEach((item) => {
      this.redisService.set(
        `${CacheEnum.SYS_CONFIG_KEY}${item.configKey}`,
        item.configValue,
      );
    });

    return ResultData.success();
  }
}
