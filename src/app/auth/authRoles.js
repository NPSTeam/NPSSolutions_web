/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  userSystem: ['admin', 'user'],
  user: ['user'],

  onlyGuest: [],
};

export default authRoles;
