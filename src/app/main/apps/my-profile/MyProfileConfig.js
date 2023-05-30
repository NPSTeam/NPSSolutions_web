import i18next from 'i18next';
import UserNewForm from './components/UserNewForm';
import en from './i18n/en';
import vi from './i18n/vi';

i18next.addResourceBundle('en', 'myProfile', en);
i18next.addResourceBundle('vi', 'myProfile', vi);

const MyProfileConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: '/apps/my-profile',
      element: <UserNewForm />,
      exact: true,
    },
  ],
};

export default MyProfileConfig;
