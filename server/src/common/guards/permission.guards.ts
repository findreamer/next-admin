import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const perm = this.reflector.getAllAndOverride('permission', [
      ctx.getClass(),
      ctx.getHandler(),
    ]);

    console.log('perm ==> ', perm);
    // 不需要鉴权
    if (perm == undefined) return true;

    // 鉴权
    return this.hasPermission(perm, req.user.permissions);
  }

  hasPermission(per: string, permissions: string[]) {
    const AllPermission = '*:*:*';
    return (
      permissions.includes(AllPermission) || permissions.some((v) => v === per)
    );
  }
}
