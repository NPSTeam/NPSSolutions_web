import i18n from 'i18next';

import en from './i18n/en';
import vi from './i18n/vi';
import ResetPassword from './ResetPassword';

i18n.addResourceBundle('en', 'reset-password', en);
i18n.addResourceBundle('vi', 'reset-password', vi);

const ResetPasswordConfig = {
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
      path: '/reset-password',
      element: <ResetPassword />,
    },
  ],
};

export default ResetPasswordConfig;
