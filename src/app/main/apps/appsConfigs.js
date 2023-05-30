import WorkspacesConfig from './workspaces/WorkspacesConfig';
import ScrumboardAppConfig from './scrumboard/ScrumboardAppConfig';
import LoginConfig from '../login/LoginConfig';
import NotesAppConfig from './notes/NotesAppConfig';
import TasksAppConfig from './tasks/TasksAppConfig';
import ManageItemsAppConfig from './manage-items-app/ManageItemsAppConfig';
import ManageRolesAppConfig from './manage-roles-app/ManageRolesAppConfig';
import ManageRoleForItemConfig from './manage-role-for-item/ManageRoleForItemConfig';
import ManageWorkspaceForRoleConfig from './manage-workspace-for-role/ManageWorkspaceForRoleConfig';
import TeamsConfig from './teams/TeamsConfig';
import ManageTeamForRoleConfig from './manage-team-for-role/ManageTeamForRoleConfig';
import UsersConfig from './users/UsersConfig';
import ChatAppConfig from './chat/ChatAppConfig';
import ContactsAppConfig from './contacts/ContactsAppConfig';
import MailboxAppConfig from './mailbox/MailboxAppConfig';
import ServiceAIConfig from './service-ai/ServiceAIConfig';

const npssolutionsAppConfig = [
  LoginConfig,
  WorkspacesConfig,
  UsersConfig,
  TeamsConfig,
  ScrumboardAppConfig,
  NotesAppConfig,
  TasksAppConfig,
  ManageItemsAppConfig,
  ManageRolesAppConfig,
  ManageRoleForItemConfig,
  ManageTeamForRoleConfig,
  ManageWorkspaceForRoleConfig,
  ChatAppConfig,
  ContactsAppConfig,
  MailboxAppConfig,
  ServiceAIConfig,
];

export default npssolutionsAppConfig;
