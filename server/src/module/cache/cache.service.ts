import { Injectable } from '@nestjs/common';
import { RedisService } from '@app/module/redis/redis.service';
import { ResultData } from '@app/common/utils';
@Injectable()
export class CacheService {
  constructor(private readonly redisService: RedisService) {}

  private readonly caches = [
    {
      cacheName: 'login_tokens:',
      cacheKey: '',
      cacheValue: '',
      remark: '用户信息',
    },
    {
      cacheName: 'sys_config:',
      cacheKey: '',
      cacheValue: '',
      remark: '配置信息',
    },
    {
      cacheName: 'sys_dict:',
      cacheKey: '',
      cacheValue: '',
      remark: '数据字典',
    },
    {
      cacheName: 'captcha_codes:',
      cacheKey: '',
      cacheValue: '',
      remark: '验证码',
    },
    {
      cacheName: 'repeat_submit:',
      cacheKey: '',
      cacheValue: '',
      remark: '防重提交',
    },
    {
      cacheName: 'rate_limit:',
      cacheKey: '',
      cacheValue: '',
      remark: '限流处理',
    },
    {
      cacheName: 'pwd_err_cnt:',
      cacheKey: '',
      cacheValue: '',
      remark: '密码错误次数',
    },
  ];
  async getInfo() {
    const info = await this.redisService.getInfo();
    const dbSzize = await this.redisService.getDbSize();
    const commandStats = await this.redisService.commandStats();
    return ResultData.success({
      info,
      dbSzize,
      commandStats,
    });
  }

  async getNames() {
    return ResultData.success(this.caches);
  }

  async getKeys(id: string) {
    const data = await this.redisService.keys(id + '*');
    return ResultData.success(data);
  }
}
