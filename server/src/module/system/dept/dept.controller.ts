import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DeptService } from './dept.service';
import { CreateDeptDto, ListDeptDto, UpdateDeptDto } from './dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllowAnon } from '@app/common/decorators/allow-anon.decorator';

@ApiTags('部门管理')
@Controller('system/dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @ApiOperation({
    summary: '部门管理-新建',
  })
  @ApiBody({
    type: CreateDeptDto,
    required: true,
  })
  @Post()
  @HttpCode(200)
  @AllowAnon()
  create(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.create(createDeptDto);
  }

  @ApiOperation({
    summary: '部门管理-列表',
  })
  @Get('/list')
  @AllowAnon()
  findAll(@Query() query: ListDeptDto) {
    return this.deptService.findAll(query);
  }

  @ApiOperation({
    description: '部门管理-详情',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deptService.findOne(+id);
  }

  @ApiOperation({
    description: '部门管理-更新',
  })
  @Put()
  update(@Body() updateDeptDto: UpdateDeptDto) {
    return this.deptService.update(updateDeptDto);
  }
}
