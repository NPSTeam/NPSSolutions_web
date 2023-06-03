import i18n from 'i18next';

import en from './i18n/en';
import vi from './i18n/vi';
import Workspaces from './page/Workspaces';
import ManageUser from './page/manageUser/ManageUser';
import AddProject from './page/AddProject';

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
      // auth: authRoles.staffWorkspaces,
    },
    {
      path: '/apps/add-workspaces',
      element: <AddProject />,
      // auth: authRoles.staffWorkspaces,
    },
    {
      path: '/apps/workspace-manage-users/:id',
      // element: lazy(() => import('./page/manageUser/ManageUser')),
      element: <ManageUser />,
      // auth: authRoles.staffWorkspaces,
    },
  ],
};

export default WorkspacesConfig;
