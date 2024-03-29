import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import i18next from 'i18next';
import { authRoles } from 'src/app/auth';
import ScrumboardApp from './ScrumboardApp';
import en from './i18n/en';
import vi from './i18n/vi';

i18next.addResourceBundle('en', 'scrumboardApp', en);
i18next.addResourceBundle('vi', 'scrumboardApp', vi);

const Board = lazy(() => import('./board/Board'));
const Boards = lazy(() => import('./boards/Boards'));

const ScrumboardAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/scrumboard',
      element: <ScrumboardApp />,
      auth: authRoles.staffScrumboard,
      children: [
        {
          path: '',
          element: <Navigate to="/apps/scrumboard/boards" />,
        },
        {
          path: 'boards',
          element: <Boards />,
        },
        {
          path: 'boards/:boardId',
          element: <Board />,
        },
      ],
    },
  ],
};

export default ScrumboardAppConfig;
