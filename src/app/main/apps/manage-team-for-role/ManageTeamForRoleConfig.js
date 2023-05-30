import i18n from 'i18next';

import { authRoles } from 'src/app/auth';
import en from './i18n/en';
import vi from './i18n/vi';
import ManageTeamForRole from './page/ManageTeamForRole';

i18n.addResourceBundle('en', 'manageTeamForRole', en);
i18n.addResourceBundle('vi', 'manageTeamForRole', vi);

const ManageTeamForRoleConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/manage-team-for-role',
      element: <ManageTeamForRole />,
      auth: authRoles.admin,
    },
  ],
};

export default ManageTeamForRoleConfig;
