import { Controller, Get, Query } from '@nestjs/common';
import { LoginlogService } from './loginlog.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListLoginlogDto } from './dto';

@ApiTags('登陆日志')
@Controller('monitor/logininfor')
export class LoginlogController {
  constructor(private readonly loginlogService: LoginlogService) {}

  @ApiOperation({ summary: '登陆日志-列表' })
  @ApiQuery({
    type: ListLoginlogDto,
    required: true,
  })
  @Get('/list')
  findAll(@Query() query: ListLoginlogDto) {
    return this.loginlogService.findAll(query);
  }
}
