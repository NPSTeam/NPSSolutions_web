import i18n from 'i18next';

import { authRoles } from 'src/app/auth';
import en from './i18n/en';
import vi from './i18n/vi';
import Users from './page/Users';

i18n.addResourceBundle('en', 'users', en);
i18n.addResourceBundle('vi', 'users', vi);

const UsersConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/users',
      element: <Users />,
      auth: authRoles.admin,
    },
  ],
};

export default UsersConfig;
