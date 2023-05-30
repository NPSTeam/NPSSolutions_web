import i18n from 'i18next';

import { authRoles } from 'src/app/auth';
import en from './i18n/en';
import vi from './i18n/vi';
import ManageItemsApp from './page/ManageItemsApp';

i18n.addResourceBundle('en', 'manageItemsApp', en);
i18n.addResourceBundle('vi', 'manageItemsApp', vi);

const ManageItemsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/manage-items-app',
      element: <ManageItemsApp />,
      auth: authRoles.admin,
    },
  ],
};

export default ManageItemsAppConfig;
