import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const role = this.reflector.getAllAndOverride('roles', [
      context.getClass(),
      context.getHandler(),
    ]);
    console.log('role => ', role);
    if (role) {
      return this.hasRole(role, req.user.roles);
    }

    return true;
  }

  /**
   * 检测用户是否属于某个角色
   * @param role
   * @param userRoles
   * @returns
   */
  hasRole(role: string, userRoles: string[]) {
    return userRoles.some((v) => v === role);
  }
}
