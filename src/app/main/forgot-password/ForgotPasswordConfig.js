import { lazy } from 'react';

import authRoles from '../../auth/authRoles';
import ForgotPassword from './ForgotPassword';

// Fake Data
const Checked = lazy(() => import('./Checked'));

const ForgotPasswordConfig = {
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
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'forgot-password/checked',
      element: <Checked />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
  ],
};

export default ForgotPasswordConfig;
