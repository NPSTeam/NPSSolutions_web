import { motion } from 'framer-motion';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setSystemSettings, updateSystemSettings } from '../../store/systemSettingsSlice';

function EmailTab() {
  const dispatch = useDispatch();
  const systemSettings = useSelector(
    ({ systemSettingsApp }) => systemSettingsApp.systemSettings.systemSettings
  );

  function onSubmit() {
    dispatch(updateSystemSettings(systemSettings));
  }
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const { t } = useTranslation('systemSettings');

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div className="w-full">
        <Box className="grid grid-cols-2 gap-4 justify-center w-full">
          <Box display="flex" flexDirection="column" padding="1rem">
            <Box sx={{ display: 'flex' }}>
              <Typography
                fontWeight={500}
                color="primary.contrastText"
                sx={{ flex: 1, color: '#000', fontSize: '1.6rem', fontWeight: '650' }}
              >
                {t('EMAIL_HOST').split('T')[0]}
                <Typography component="span" fontWeight={900} sx={{ color: 'red' }}>
                  {t('EMAIL_HOST').split('T')[1]}*
                </Typography>
              </Typography>
            </Box>

            <TextField
              value={systemSettings?.emailHost}
              onChange={(e) => {
                dispatch(setSystemSettings({ ...systemSettings, emailHost: e.target.value }));
              }}
              placeholder={t('EMAIL_HOST')}
              sx={{
                flex: 3,
                '& .MuiOutlinedInput-root': {
                  height: 35,
                },
              }}
              inputProps={{
                style: {
                  color: '#000',
                  fontSize: '1.5rem',
                  padding: '0.5rem 1.5rem 0.5rem 1.5rem',
                },
              }}
            />
          </Box>

          <Box display="flex" flexDirection="column" padding="1rem">
            <Box sx={{ display: 'flex' }}>
              <Typography
                fontWeight={500}
                color="primary.contrastText"
                sx={{ flex: 1, color: '#000', fontSize: '1.6rem', fontWeight: '650' }}
              >
                {t('EMAIL_DEFAULT').split('T')[0]}
                <Typography component="span" fontWeight={900} sx={{ color: 'red' }}>
                  {t('EMAIL_DEFAULT').split('T')[1]}*
                </Typography>
              </Typography>
            </Box>

            <TextField
              value={systemSettings?.emailDefault}
              onChange={(e) => {
                dispatch(setSystemSettings({ ...systemSettings, emailDefault: e.target.value }));
              }}
              placeholder={t('EMAIL_DEFAULT')}
              sx={{
                flex: 3,
                '& .MuiOutlinedInput-root': {
                  height: 35,
                },
              }}
              inputProps={{
                style: {
                  color: '#000',
                  fontSize: '1.5rem',
                  padding: '0.5rem 1.5rem 0.5rem 1.5rem',
                },
              }}
            />
          </Box>

          <Box display="flex" flexDirection="column" padding="1rem">
            <Box sx={{ display: 'flex' }}>
              <Typography
                fontWeight={500}
                color="primary.contrastText"
                sx={{ flex: 1, color: '#000', fontSize: '1.6rem', fontWeight: '650' }}
              >
                {t('EMAIL_PORT').split('T')[0]}
                <Typography component="span" fontWeight={900} sx={{ color: 'red' }}>
                  {t('EMAIL_PORT').split('T')[1]}*
                </Typography>
              </Typography>
            </Box>

            <TextField
              value={systemSettings?.emailPort}
              onChange={(e) => {
                dispatch(setSystemSettings({ ...systemSettings, emailPort: e.target.value }));
              }}
              placeholder={t('EMAIL_PORT')}
              sx={{
                flex: 3,
                '& .MuiOutlinedInput-root': {
                  height: 35,
                },
              }}
              inputProps={{
                style: {
                  color: '#000',
                  fontSize: '1.5rem',
                  padding: '0.5rem 1.5rem 0.5rem 1.5rem',
                },
              }}
            />
          </Box>

          <Box display="flex" flexDirection="column" padding="1rem">
            <Box sx={{ display: 'flex' }}>
              <Typography
                fontWeight={500}
                color="primary.contrastText"
                sx={{ flex: 1, color: '#000', fontSize: '1.6rem', fontWeight: '650' }}
              >
                {t('EMAIL_PASSWORD').split('D')[0]}
                <Typography component="span" fontWeight={900} sx={{ color: 'red' }}>
                  {t('EMAIL_PASSWORD').split('D')[1]}*
                </Typography>
              </Typography>
            </Box>

            <TextField
              value={systemSettings?.emailPassword}
              type="password"
              onChange={(e) => {
                dispatch(setSystemSettings({ ...systemSettings, emailPassword: e.target.value }));
              }}
              placeholder={t('EMAIL_PASSWORD')}
              sx={{
                flex: 3,
                '& .MuiOutlinedInput-root': {
                  height: 35,
                },
              }}
              inputProps={{
                style: {
                  color: '#000',
                  fontSize: '1.5rem',
                  padding: '0.5rem 1.5rem 0.5rem 1.5rem',
                },
              }}
            />
          </Box>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-30 mx-auto mt-4"
          value="legacy"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </motion.div>
  );
}

export default EmailTab;
