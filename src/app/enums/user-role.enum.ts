export enum UserRole {
  SuperAdmin = 'superadmin',
  Admin = 'admin',
  Staff = 'staff',
}

export const UserRoleLabel: Record<UserRole, string> = {
  [UserRole.SuperAdmin]: 'Super Admin',
  [UserRole.Admin]: 'Admin',
  [UserRole.Staff]: 'Staff',
};
