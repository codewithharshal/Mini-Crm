import { IsEnum } from 'class-validator';
import { UserRole } from '../auth/enum/userRole.enum.js';

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role!: UserRole;
}
