import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { AllowAnon } from '@app/common/decorators/allow-anon.decorator';

@Controller('system/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AllowAnon()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
