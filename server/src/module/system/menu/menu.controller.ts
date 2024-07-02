import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto, ListMenuDto } from './dto';

@ApiTags('菜单管理')
@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({
    summary: '菜单管理-创建',
  })
  @ApiBody({
    type: CreateMenuDto,
    required: true,
  })
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @ApiOperation({
    summary: '菜单管理-列表',
  })
  @Get('/list')
  findAll(@Query() query: ListMenuDto) {
    return this.menuService.findAll(query);
  }
}
