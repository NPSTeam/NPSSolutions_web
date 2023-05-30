import i18n from 'i18next';

import { authRoles } from 'src/app/auth';
import en from './i18n/en';
import vi from './i18n/vi';
import ManageWorkspaceForRole from './page/ManageWorkspaceForRole';

i18n.addResourceBundle('en', 'manageWorkspaceForRole', en);
i18n.addResourceBundle('vi', 'manageWorkspaceForRole', vi);

const ManageWorkspaceForRoleConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/manage-workspace-for-role',
      element: <ManageWorkspaceForRole />,
      auth: authRoles.admin,
    },
  ],
};

export default ManageWorkspaceForRoleConfig;
