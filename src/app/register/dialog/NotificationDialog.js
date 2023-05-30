import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

import { closeDialog } from 'app/store/fuse/dialogSlice';

import Dialog from '@mui/material/Dialog';
import { Typography, Button, DialogTitle, CircularProgress } from '@mui/material';

export default function NotificationDialog() {
  const { t } = useTranslation('register');
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const success = useSelector((state) => state.auth.register.success);
  const errorsResponse = useSelector((state) => state.auth.register.errorsResponse);

  const test = useSelector((state) => state);

  useEffect(() => {
    console.log(success);
  }, [success]);

  const handleClose = () => {
    dispatch(closeDialog());
  };
  console.log(test);

  return (
    <Dialog open={open} onClose={handleClose}>
      {success === null ? (
        <DialogTitle>
          <CircularProgress />
        </DialogTitle>
      ) : (
        <Box className="flex flex-col justify-center text-center space-y-36 w-256 py-44">
          <Box className="flex justify-center">
            <img src="assets/images/logo/logo.svg" style={{ width: 120, height: 120 }} alt="logo" />
          </Box>
          <Typography style={{ fontWeight: 800, fontSize: 24 }}>{t('SIGN_UP')}</Typography>
          {success ? (
            <Typography className="text-15 font-600" style={{ color: '#228C22' }}>
              {t('SIGN_UP_SUCCESSFUL')}
            </Typography>
          ) : (
            <Box className="flex flex-col">
              <Typography className="text-15 font-400" style={{ color: '#FF0000' }}>
                {t('SIGN_UP_FAILED')}
              </Typography>
              <Typography className="text-15 font-400" style={{ color: '#FF0000' }}>
                {errorsResponse}
              </Typography>
            </Box>
          )}
          <Button onClick={handleClose}>
            {success === true ? (
              <Link className="font-normal" to="/login">
                <Typography style={{ color: '#99BBC5' }}>{t('GO_BACK_TO_LOGIN')}</Typography>
              </Link>
            ) : (
              <Typography style={{ color: '#99BBC5' }}>{t('BACK')}</Typography>
            )}
          </Button>
        </Box>
      )}
    </Dialog>
  );
}
