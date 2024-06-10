import { Injectable } from '@nestjs/common';
import { UserService } from '../system/user/user.service';
import { ClientInfoDto, LoginDto } from './dto';

@Injectable()
export class MainService {
  constructor(private readonly userService: UserService) {}

  async login(user: LoginDto, clientInfo: ClientInfoDto) {}
}
