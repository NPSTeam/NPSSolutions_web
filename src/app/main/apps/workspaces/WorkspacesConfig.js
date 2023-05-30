import i18n from 'i18next';

import { authRoles } from 'src/app/auth';
import en from './i18n/en';
import vi from './i18n/vi';
import Workspaces from './page/Workspaces';
import ManageUser from './page/manageUser/ManageUser';

i18n.addResourceBundle('en', 'workspaces', en);
i18n.addResourceBundle('vi', 'workspaces', vi);

const WorkspacesConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/workspaces',
      element: <Workspaces />,
      auth: authRoles.admin,
    },
    {
      path: '/apps/workspace-manage-users/:id',
      // element: lazy(() => import('./page/manageUser/ManageUser')),
      element: <ManageUser />,
      // auth: authRoles.admin,
    },
  ],
};

export default WorkspacesConfig;
