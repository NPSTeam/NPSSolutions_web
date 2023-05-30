import { lazy } from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import vi from './i18n/vi';
import ServiceAIApp from './ServiceAIApp';

const SystemSettingsApp = lazy(() => import('./ServiceAIApp'));

i18next.addResourceBundle('en', 'serviceAI', en);
i18next.addResourceBundle('vi', 'serviceAI', vi);

const ServiceAIConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/service-ai',
      element: <ServiceAIApp />,
    },
  ],
};

export default ServiceAIConfig;
