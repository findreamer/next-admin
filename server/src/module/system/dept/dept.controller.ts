import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { DeptService } from './dept.service';
import { CreateDeptDto, ListDeptDto } from './dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

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
  create(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.create(createDeptDto);
  }

  @ApiOperation({
    summary: '部门管理-列表',
  })
  @Get('/list')
  findAll(@Query() query: ListDeptDto) {
    return this.deptService.findAll(query);
  }
}
