const url = {
  signUpByEmail: '/api/v1/auth/register',

  checkOTP: '/api/v1/auth/check-otp',
  updatePasswordForgot: '/api/v1/auth/update-password-forgot',
  forgotPassword: '/api/v1/auth/forgot-password',

  login: '/api/v1/auth/login',

  logout: '/api/v1/user/logout',

  updateProfile: 'api/v1/user/update-profile',
  changePassword: 'api/v1/user/change-password',

  refresh: '/api/v1/auth/refresh-token',
  profile: '/api/v1/user/profile',
  userForWorkspace: '/api/v1/user/user-for-workspace',
  userRoleWorkspace: (id) => `/api/v1/user/${id}/user-role-workspace`,

  workspaces: '/api/v1/workspace/list',
  getListService: '/api/v1/workspace/enums',
  addWorkspace: '/api/v1/workspace/add',
  deleteWorkspace: (id) => `/api/v1/workspace/${id}/delete`,
  updateWorkspace: '/api/v1/workspace/update',
  exportWorkspace: '/api/v1/workspace/export',
  assignUser: '/api/v1/workspace/add-user',
  listUserInWorkspace: (id) => `/api/v1/workspace/${id}/list-user`,
  listUserChecked: (id) => `/api/v1/workspace/${id}/list-user-checked`,
  listUser: '/api/v1/manager/user/list',

  // USER
  listUsers: '/api/v1/manager/user/list',
  updateUser: '/api/v1/manager/user/update',
  deleteUser: (id) => `/api/v1/manager/user/${id}/delete`,
  exportUser: '/api/v1/manager/user/export-excel',

  // TEAMS
  teams: '/api/v1/teams/list',
  addTeam: '/api/v1/teams',
  updateTeam: '/api/v1/teams',
  deleteTeam: (id) => `/api/v1/teams/${id}`,
  exportTeam: '/api/v1/teams/export-excel',

  // ITEM APP
  listItemsApp: '/api/v1/items/list',
  addItemApp: '/api/v1/items',
  updateItemApp: '/api/v1/items',
  deleteItemApp: (id) => `/api/v1/items/${id}`,
  exportItemApp: '/api/v1/items/export-excel',
  listUserInTeam: (id) => `/api/v1/teams/list-user/${id}`,
  listUserCheckedInTeam: (id) => `/api/v1/teams/list-user-checked/${id}`,
  assignUserToTeam: '/api/v1/teams/add-user',

  // ROLE APP
  listRolesApp: '/api/v1/roles/list',
  addRoleApp: '/api/v1/roles',
  updateRoleApp: '/api/v1/roles',
  deleteRoleApp: (id) => `/api/v1/roles/${id}`,
  exportRoleApp: '/api/v1/roles/export-excel',

  // ROLE FOR ITEM APP
  listRolesAndItems: '/api/v1/role-for-item',
  getRoleForItems: (id) => `/api/v1/role-for-item/${id}`,
  updateRoleForItems: '/api/v1/role-for-item',

  // WORKSPACE FOR ROLE APP
  listWorkspacesAndRoles: '/api/v1/workspace-for-role',
  getWorkspaceForRoles: (id) => `/api/v1/workspace-for-role/${id}`,
  updateWorkspaceForRoles: '/api/v1/workspace-for-role',

  // TEAM FOR ROLE APP
  listTeamsAndRoles: '/api/v1/team-for-role',
  getTeamForRoles: (id) => `/api/v1/team-for-role/${id}`,
  updateTeamForRoles: '/api/v1/team-for-role',

  // SCRUM
  listBoards: (workspaceId) => `/api/v1/scrumboards/boards/${workspaceId}/list`,
};

export default url;
