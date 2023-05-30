import { lazy } from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import vi from './i18n/vi';

const SystemSettingsApp = lazy(() => import('./SystemSettingsApp'));

i18next.addResourceBundle('en', 'systemSettings', en);
i18next.addResourceBundle('vi', 'systemSettings', vi);

const SystemSettingsAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'admin/system-settings',
      element: <SystemSettingsApp />,
    },
  ],
};

export default SystemSettingsAppConfig;
