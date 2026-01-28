import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../users/decorators/roles.decorator.js';
import { UserRole } from '../enum/userRole.enum.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requireRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!requireRoles.includes(user.role)) {
      throw new ForbiddenException('Admin resource. Access denied.');
    }

    return true;
  }
}
