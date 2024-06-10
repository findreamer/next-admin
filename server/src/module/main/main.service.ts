import { Injectable } from '@nestjs/common';
import { UserService } from '../system/user/user.service';
import { ClientInfoDto, LoginDto } from './dto';
import { AxiosService } from '../axios/axios.service';

@Injectable()
export class MainService {
  constructor(
    private readonly userService: UserService,
    private readonly axiosService: AxiosService,
  ) {}

  async login(user: LoginDto, clientInfo: ClientInfoDto) {
    const loginLog = {
      ...clientInfo,
      userName: user.username,
      status: '0',
      msg: '',
    };

    try {
      const loginLocation = await this.axiosService.getIpAddress(
        clientInfo.ipaddr,
      );
      loginLog.loginLocation = loginLocation;
    } catch (error) {}

    const loginRes = await this.userService.login(user, loginLog);
  }
}
