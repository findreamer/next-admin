import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
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

  @ApiOperation({
    summary: '登陆日志-清空',
  })
  @Delete('/clean')
  removeAll() {
    return this.loginlogService.removeAll();
  }

  @ApiOperation({
    summary: '登陆日志-删除',
  })
  @Delete(':id')
  remove(@Param('id') ids: string) {
    const infoIds = ids.split(',').map((id) => +id);
    return this.loginlogService.remove(infoIds);
  }
}
