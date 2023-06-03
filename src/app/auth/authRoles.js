/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  userSystem: ['admin', 'user'],
  user: ['user'],
  onlyGuest: [],
  staffScrumboard: ['MENU_SCRUMBOARD'],
  staffNotes: ['MENU_NOTES'],
  staffTasks: ['MENU_TASKS'],
  staffCalendar: ['MENU_CALENDAR'],
  staffMail: ['MENU_MAIL'],
  staffContact: ['MENU_CONTACT'],
  staffChat: ['MENU_CHAT'],
  staffServiceAI: ['MENU_SERVICE_AI'],
  staffWorkspaces: ['MENU_WORKSPACES'],
};

export default authRoles;
