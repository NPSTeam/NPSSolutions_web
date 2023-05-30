import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import ForgotPasswordConfig from '../main/forgot-password/ForgotPasswordConfig';
import npssolutionsAppConfig from '../main/apps/appsConfigs';
import LoginConfig from '../main/login/LoginConfig';
import CalendarAppConfig from '../main/apps/calendar/CalendarAppConfig';
import RegisterConfig from '../register/RegisterConfig';
import Error404Page from '../main/404/Error404Page';
import ResetPasswordConfig from '../reset-password/ResetPasswordConfig';
import DocumentationConfig from '../main/apps/documentation/DocumentationConfig';
import MyProfileConfig from '../main/apps/my-profile/MyProfileConfig';
import RedirectConfig from '../redirect/RedirectConfig';
import { authRoles } from '../auth';
import SystemSettingsAppConfig from '../main/apps/system-settings/SystemSettingsAppConfig';
import pagesConfigs from '../main/pages/pagesConfigs';
import dashboardsConfigs from '../main/dashboards/dashboardsConfigs';

const routeConfigs = [
  ...npssolutionsAppConfig,
  ...pagesConfigs,
  ...dashboardsConfigs,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  ForgotPasswordConfig,
  LoginConfig,
  RegisterConfig,
  ResetPasswordConfig,
  // InDoorConfig,
  CalendarAppConfig,
  DocumentationConfig,
  MyProfileConfig,
  RedirectConfig,
  SystemSettingsAppConfig,
];

const routes = [
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, authRoles.userSystem),
  {
    path: '/',
    exact: true,
    element: <Navigate to="/redirect" />,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
    // element: <Register />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
