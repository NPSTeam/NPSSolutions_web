import './api/auth-api';
import './api/notifications-api';
import './api/academy-api';
import './api/scrumboard-api';
import './api/calendar-api';
import './api/notes-api';
import './api/tasks-api';
import './api/file-manager-api';
import './api/chat-api';
import './api/contacts-api';
import './api/countries-api';
import './api/dashboards/project-api';
import './api/mailbox-api';

import history from '@history';
import mock from './mock';

mock.onAny().passThrough();

if (module?.hot?.status() === 'apply') {
  const { pathname } = history.location;
  history.push('/loading');
  history.push({ pathname });
}
