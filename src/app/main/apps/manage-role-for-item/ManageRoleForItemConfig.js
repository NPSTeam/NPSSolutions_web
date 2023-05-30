import i18n from 'i18next';

import { authRoles } from 'src/app/auth';
import en from './i18n/en';
import vi from './i18n/vi';
import ManageRoleForItem from './page/ManageRoleForItem';

i18n.addResourceBundle('en', 'manageRoleForItem', en);
i18n.addResourceBundle('vi', 'manageRoleForItem', vi);

const ManageRoleForItemConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/manage-role-for-item',
      element: <ManageRoleForItem />,
      auth: authRoles.admin,
    },
  ],
};

export default ManageRoleForItemConfig;
