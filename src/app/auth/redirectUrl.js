const redirectWithRole = {
  default: '/apps/projects',
  admin: {
    redirect: '/apps/administrators',
    urls: ['/apps/administrators'],
    role: 'MASTER_ADMIN',
  },
  webOdm: {
    redirect: '/apps/projects',
    urls: ['/apps/projects'],
    role: 'CUSTOMER_ADMIN',
  },
};

export default redirectWithRole;
