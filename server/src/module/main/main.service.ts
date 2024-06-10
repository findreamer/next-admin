import { Injectable } from '@nestjs/common';
import { UserService } from '../system/user/user.service';

@Injectable()
export class MainService {
  constructor(private readonly userService: UserService) {}
}
