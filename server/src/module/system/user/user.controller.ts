import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Request,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, ListUserDto } from './dto';
import { AllowAnon } from '@app/common/decorators/allow-anon.decorator';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('用户管理')
@Controller('system/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '用户-新建用户',
  })
  @ApiBody({
    type: CreateUserDto,
    required: true,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: '用户-列表',
  })
  @Get('/list')
  findAll(@Query() query: ListUserDto, @Request() req) {
    const user = req.user.user;
    return this.userService.findAll(query, user);
  }

  @ApiOperation({
    summary: '用户-部门树',
  })
  @Get('/deptTree')
  deptTree() {
    return this.userService.deptTree();
  }

  @ApiOperation({
    summary: '用户-角色+岗位',
  })
  @Get()
  findPostAndRoleAll() {
    return this.userService.findPostAndRoleAll();
  }

  @ApiOperation({
    summary: '用户-分配角色-详情',
  })
  @Get('/authRole/:id')
  authRole(@Param('id') id: string) {
    return this.userService.authRole(+id);
  }
}
