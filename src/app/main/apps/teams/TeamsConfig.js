import i18n from 'i18next';

import { authRoles } from 'src/app/auth';
import en from './i18n/en';
import vi from './i18n/vi';
import Teams from './page/Teams';
import ManageUser from './page/manageUser/ManageUser';

i18n.addResourceBundle('en', 'teams', en);
i18n.addResourceBundle('vi', 'teams', vi);

const TeamsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/teams',
      element: <Teams />,
      auth: authRoles.admin,
    },
    {
      path: '/apps/team-manage-users/:id',
      // element: lazy(() => import('./page/manageUser/ManageUser')),
      element: <ManageUser />,
      // auth: authRoles.admin,
    },
  ],
};

export default TeamsConfig;
