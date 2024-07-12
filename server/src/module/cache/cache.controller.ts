import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CacheService } from './cache.service';

@ApiTags('缓存管理')
@Controller('monitor/cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @ApiOperation({
    summary: '缓存监控信息',
  })
  @Get()
  getInfo() {
    return this.cacheService.getInfo();
  }

  @ApiOperation({
    summary: '缓存列表',
  })
  @Get('/getNames')
  getNames() {
    return this.cacheService.getNames();
  }

  @ApiOperation({
    summary: '键名列表',
  })
  @Get('/getKeys/:id')
  getKeys(@Param('id') id: string) {
    return this.cacheService.getKeys(id);
  }
}
