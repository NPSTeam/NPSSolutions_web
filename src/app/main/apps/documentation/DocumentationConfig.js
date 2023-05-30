import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import MockApiDoc from './mock-api/MockApiDoc';

const DocumentationPageLayout = lazy(() => import('./DocumentationPageLayout'));

const DocumentationConfig = {
  routes: [
    {
      path: 'documentation',
      element: <Navigate to="/documentation/getting-started/introduction" />,
    },
    {
      path: 'documentation/mock-api',
      element: <MockApiDoc />,
    },
  ],
};

export default DocumentationConfig;
