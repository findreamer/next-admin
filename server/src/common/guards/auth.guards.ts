// 辅助类，用于获取元数据
import { Reflector } from '@nestjs/core';
import {
  UnauthorizedException,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { pathToRegexp } from 'path-to-regexp';
import { ALLOW_ANON } from '@app/common/decorators/allow-anon.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private globalWhiteList = [];

  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
  ) {
    super();
    this.globalWhiteList = [].concat(
      this.config.get('perm.router.whitelist') ?? [],
    );
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    // 判断是否在白名单内
    const isInWhiteList = this.checkWhiteList(ctx);
    if (isInWhiteList) return true;

    // 判断接口是否不需要校验 token
    const allowAnon = this.reflector.get<boolean>(ALLOW_ANON, ctx.getHandler());
    if (allowAnon) return true;

    const req = ctx.switchToHttp().getRequest();
    const accessToken = req.get('Authorization');

    if (!accessToken) throw new ForbiddenException('请重新登陆');
    // 待完成，校验 token 是否 过期

    return this.activate(ctx);
  }

  async activate(ctx: ExecutionContext) {
    return super.canActivate(ctx) as Promise<boolean>;
  }

  checkWhiteList(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest() as Request;

    const i = this.globalWhiteList.findIndex((route) => {
      // 请求类型相同
      if (req.method.toUpperCase() === route.method.toUpperCase()) {
        // 对比 url
        return !!pathToRegexp(route.path).exec(req.url);
      }
      return false;
    });

    return i > -1;
  }
}
