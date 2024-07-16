import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MainService } from './main.service';
import { LoginDto, ClientInfoDto, RegisterDto } from './dto';
import { Request } from 'express';
import * as Useragent from 'useragent';

@ApiTags('根目录')
@Controller('/')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @ApiOperation({ summary: '用户登陆' })
  @ApiBody({
    type: LoginDto,
    required: true,
  })
  @Post('/login')
  @HttpCode(200)
  login(@Body() user: LoginDto, @Req() req: Request) {
    const agent = Useragent.parse(req.headers['user-agent']);
    const os = agent.os.toJSON().family;
    const browser = agent.toAgent();
    const clientInfo: ClientInfoDto = {
      userAgent: req.headers['user-agent'],
      ipaddr: req.ip,
      browser: browser,
      os: os,
      loginLocation: '',
    };

    return this.mainService.login(user, clientInfo);
  }

  @Post('/logout')
  logout(@Req() req: Request) {
    const agent = Useragent.parse(req.headers['user-agent']);
    const os = agent.os.toJSON().family;
    const browser = agent.toAgent();
    const clientInfo: ClientInfoDto = {
      userAgent: req.headers['user-agent'],
      ipaddr: req.ip,
      browser: browser,
      os: os,
      loginLocation: '',
    };
    return this.mainService.logout(clientInfo);
  }

  register(@Body() user: RegisterDto) {
    this.mainService.register(user);
  }
}
