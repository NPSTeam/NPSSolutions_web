import i18n from 'i18next';
import Register from './Register';

import en from './i18n/en';
import vi from './i18n/vi';

i18n.addResourceBundle('en', 'register', en);
i18n.addResourceBundle('vi', 'register', vi);

const RegisterConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: null,
  routes: [
    {
      path: '/register',
      element: <Register />,
    },
  ],
};

export default RegisterConfig;
