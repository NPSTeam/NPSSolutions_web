import i18n from 'i18next';
import Home from './HomePage';

import en from './i18n/en';
import vi from './i18n/vi';

i18n.addResourceBundle('en', 'login', en);
i18n.addResourceBundle('vi', 'login', vi);

const NewHomeConfig = {
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
      path: '/homepage',
      element: <Home />,
    },
  ],
};

export default NewHomeConfig;
