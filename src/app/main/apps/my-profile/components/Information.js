import { AppBar, Card, CardContent, Icon, Toolbar, Typography } from '@mui/material';
import { openDialog } from 'app/store/fuse/dialogSlice';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ChangePassword from '../dialog/ChangePassword';

const Information = () => {
  const { t } = useTranslation('myProfile');

  const dispatch = useDispatch();

  const user = useSelector(({ auth }) => auth.user);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full px-16 sm:px-24"
      style={{ maxWidth: '850px' }}
    >
      <div className="md:flex max-w-2xl" style={{ minWidth: '100%' }}>
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  {t('GENERAL_INFORMATION')}
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">{t('EMAIL')}</Typography>
                <Typography>{user.email}</Typography>
              </div>

              <div className="mb-24" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Typography className="font-semibold mb-4 text-15">
                    {t('CHANGE_PASSWORD')}
                  </Typography>
                  <Typography>
                    {t('YOU_SHOULD_USE_A_STRONG_PASSWORD_THAT_YOU_HAVE_NOT_USED_ANYWHERE_ELSE')}
                  </Typography>
                </div>
                <Icon
                  onClick={() =>
                    dispatch(
                      openDialog({
                        children: <ChangePassword />,
                      })
                    )
                  }
                  className="text-20 mx-4"
                  color="action"
                  style={{ cursor: 'pointer' }}
                >
                  create
                </Icon>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">{t('ROLE')}</Typography>

                <Typography>{user?.roles ? user?.roles[0].toString() : t('GUEST')}</Typography>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
export default Information;
