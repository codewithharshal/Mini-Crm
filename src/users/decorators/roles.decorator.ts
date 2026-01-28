import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../auth/enum/userRole.enum.js';

export const ROLES_KEY = UserRole;
export const Roles = (...roles: UserRole[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
