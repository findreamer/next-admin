import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Request,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ChangeStatusDto,
  CreateUserDto,
  ListUserDto,
  ResetPwdDto,
  UpdateUserDto,
} from './dto';
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

  @ApiOperation({
    summary: '用户-角色信息更新',
  })
  @Put('/authROle')
  updateAuthRole(@Query() query) {
    return this.userService.updateAuthRole(query);
  }

  @ApiOperation({
    summary: '用户-详情',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({
    summary: '用户-停用角色',
  })
  @ApiBody({
    type: ChangeStatusDto,
    required: true,
  })
  @Put('/changeStatus')
  changeStatus(@Body() changeStatus: ChangeStatusDto) {
    return this.userService.changeStatus(changeStatus);
  }

  @ApiOperation({
    summary: '用户-更新',
  })
  @ApiBody({
    type: UpdateUserDto,
    required: true,
  })
  @Put()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @ApiOperation({
    summary: '用户-重置密码',
  })
  @ApiBody({
    type: ResetPwdDto,
    required: true,
  })
  restpwd(@Body() resetPwdDto: ResetPwdDto) {
    return this.userService.resetPwd(resetPwdDto);
  }

  @ApiOperation({
    summary: '用户-删除',
  })
  @Delete(':id')
  remove(@Param('id') ids: string) {
    const userIds = ids.split(',').map((id) => Number(id));
    return this.userService.remove(userIds);
  }
}
