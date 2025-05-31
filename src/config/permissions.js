// src/config/permissions.js
export const PERMISSIONS = {
  MANAGE_ROLES: 'manage_roles',
  EDIT_ROLES: 'edit_roles',
  DELETE_ROLES: 'delete_roles',
};

// Mock current user permissions (replace with real auth context)
export const currentUserPermissions = [
  PERMISSIONS.MANAGE_ROLES,
  PERMISSIONS.EDIT_ROLES,
];