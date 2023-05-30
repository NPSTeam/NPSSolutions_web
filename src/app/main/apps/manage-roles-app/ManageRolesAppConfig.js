import i18n from 'i18next';

import { authRoles } from 'src/app/auth';
import en from './i18n/en';
import vi from './i18n/vi';
import ManageRolesApp from './page/ManageRolesApp';

i18n.addResourceBundle('en', 'manageRolesApp', en);
i18n.addResourceBundle('vi', 'manageRolesApp', vi);

const ManageRolesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/manage-roles-app',
      element: <ManageRolesApp />,
      auth: authRoles.admin,
    },
  ],
};

export default ManageRolesAppConfig;
