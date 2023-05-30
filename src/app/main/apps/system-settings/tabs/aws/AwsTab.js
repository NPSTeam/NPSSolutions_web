import { motion } from 'framer-motion';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setSystemSettings, updateSystemSettings } from '../../store/systemSettingsSlice';

function AwsTab() {
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
                {t('AWS_ACCESS_KEY').split('Y')[0]}
                <Typography component="span" fontWeight={900} sx={{ color: 'red' }}>
                  {t('AWS_ACCESS_KEY').split('E')[1]}*
                </Typography>
              </Typography>
            </Box>

            <TextField
              value={systemSettings?.awsAccessKey}
              onChange={(e) => {
                dispatch(setSystemSettings({ ...systemSettings, awsAccessKey: e.target.value }));
              }}
              placeholder={t('AWS_ACCESS_KEY')}
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
                {t('AWS_SECRET_KEY').split('Y')[0]}
                <Typography component="span" fontWeight={900} sx={{ color: 'red' }}>
                  {t('AWS_SECRET_KEY').split('E')[1]}*
                </Typography>
              </Typography>
            </Box>

            <TextField
              value={systemSettings?.awsSecretKey}
              onChange={(e) => {
                dispatch(setSystemSettings({ ...systemSettings, awsSecretKey: e.target.value }));
              }}
              placeholder={t('AWS_SECRET_KEY')}
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
                {t('AWS_REGION').split('N')[0]}
                <Typography component="span" fontWeight={900} sx={{ color: 'red' }}>
                  {t('AWS_REGION').split('E')[1]}*
                </Typography>
              </Typography>
            </Box>

            <TextField
              value={systemSettings?.awsRegion}
              onChange={(e) => {
                dispatch(setSystemSettings({ ...systemSettings, awsRegion: e.target.value }));
              }}
              placeholder={t('PROJECT_NAME')}
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
          // disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </div>
    </motion.div>
  );
}

export default AwsTab;
