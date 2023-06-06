import { lazy } from 'react';
import ProfileDetail from './ProfileDetail';

const ProjectDashboardApp = lazy(() => import('./ProjectDashboardApp'));

const ProjectDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'dashboards/project',
      element: <ProjectDashboardApp />,
    },
    {
      path: '/apps/project/:workspaceId/profile-detail/:userId',
      element: <ProfileDetail />,
      exact: true,
    },
  ],
};

export default ProjectDashboardAppConfig;
