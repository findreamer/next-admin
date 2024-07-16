import { Injectable } from '@nestjs/common';
import { UserService } from '../system/user/user.service';
import { ClientInfoDto, LoginDto, RegisterDto } from './dto';
import { AxiosService } from '../axios/axios.service';
import { ResultData, SUCCESS_CODE } from '@app/common/utils';
import { LoginlogService } from '../monitor/loginlog/loginlog.service';

@Injectable()
export class MainService {
  constructor(
    private readonly userService: UserService,
    private readonly axiosService: AxiosService,
    private readonly loginlogService: LoginlogService,
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
    loginLog.status = loginRes.code === SUCCESS_CODE ? '0' : '1';
    loginLog.msg = loginRes.msg;
    this.loginlogService.create(loginLog);

    return loginRes;
  }

  async logout(clientInfo: ClientInfoDto) {
    const loginLog = {
      ...clientInfo,
      userName: '',
      status: '0',
      msg: '退出成功',
    };
    try {
      const loginLocation = await this.axiosService.getIpAddress(
        clientInfo.ipaddr,
      );
      loginLog.loginLocation = loginLocation;
    } catch (error) {}

    this.loginlogService.create(loginLog);
    return ResultData.success();
  }

  async register(user: RegisterDto) {
    return this.userService.register(user);
  }
}
