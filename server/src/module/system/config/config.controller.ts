import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigService } from './config.service';
import { CreateConfigDto } from './dto';

@ApiTags('参数配置')
@Controller('system/config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @ApiOperation({ summary: '参数设置-新建' })
  @ApiBody({
    type: CreateConfigDto,
    required: true,
  })
  @Post()
  create(@Body() createConfigDto: CreateConfigDto) {
    return this.configService.create(createConfigDto);
  }
}
