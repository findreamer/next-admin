import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('参数配置')
@Controller('system/config')
export class ConfigController {
  constructor() {}
}
