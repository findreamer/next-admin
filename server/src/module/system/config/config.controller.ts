import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ConfigService } from './config.service';
import { CreateConfigDto, ListConfigDto } from './dto';
import { RequirePermission } from '@app/common/decorators/require-permission.decorator';

@ApiTags('参数配置')
@Controller('system/config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @ApiOperation({ summary: '参数设置-新建' })
  @ApiBody({
    type: CreateConfigDto,
    required: true,
  })
  @RequirePermission('system:config:add')
  @Post()
  create(@Body() createConfigDto: CreateConfigDto) {
    return this.configService.create(createConfigDto);
  }

  @ApiOperation({ summary: '参数设置-列表' })
  @ApiQuery({
    type: ListConfigDto,
    required: true,
  })
  @Get('/list')
  @RequirePermission('system:config:query')
  findAll(query: ListConfigDto) {
    return this.configService.findAll(query);
  }
}
