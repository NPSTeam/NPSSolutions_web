/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Grid,
  Divider,
  Select,
  Checkbox,
  FormControl,
  Badge,
  Avatar,
  FormControlLabel,
  IconButton,
  Icon,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const defaultValues = {
  projectName: '',
  companyName: '',
  companyWebsite: '',
  country: '',
  city: '',
  addressDetail: '',
  customerName: '',
  customerEmail: '',
  startDate: '',
  commitedHours: '',
  projectType: '',
  neededDeveloper: '',
  technology: '',
  partner: '',
};
const BtnChangeAvatar = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));
function AddProject() {
  const { t } = useTranslation('workspaces');
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const user = useSelector(({ auth }) => auth.user);

  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
  });
  return (
    <>
      <Paper
        className="m-20 justify-between items-center flex rounded"
        sx={{
          position: 'sticky',
          top: '8rem',
          zIndex: 100,
          boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
        }}
      >
        <Typography sx={{ padding: '20px', fontSize: '18px', fontWeight: 600 }}>
          {t('NEW_PROJECT')}
        </Typography>
        <Box className="p-20">
          <Button sx={{ borderRadius: '4px', border: '1px solid grey', marginRight: '12px' }}>
            Cancel
          </Button>
          <Button sx={{ borderRadius: '4px', background: '#386FE1' }}>Save</Button>
        </Box>
      </Paper>
      <Grid container spacing={2} className="p-20">
        <Grid item xs={9}>
          <Paper className="p-20 rounded">
            <Typography style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>
              {t('GENERAL_INFORMATION')}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>{t('PROJECT_NAME')}</Typography>
                <Controller
                  name="projectName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      type="text"
                      //  error={!!errors.contentUser}
                      //  helperText={errors?.contentUser?.message}
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Enter Project Name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('COMPANY_NAME')}</Typography>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      type="text"
                      variant="outlined"
                      fullWidth
                      placeholder="Enter Company Name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('COMPANY_WEBSITE')}</Typography>
                <Controller
                  name="companyWebsite"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      type="text"
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Enter Company Website"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('COMPANY_PHONE_NUMBER')}</Typography>
                {/* <PhoneNumberInput /> */}
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('COUNTRY')}</Typography>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      autoFocus
                      type="text"
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Select country"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('CITY')}</Typography>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      autoFocus
                      type="text"
                      variant="outlined"
                      required
                      fullWidth
                      placeholder={t('CITY')}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>{t('ADDRESS_DETAIL')}</Typography>
                <Controller
                  name="addressDetail"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      type="text"
                      variant="outlined"
                      required
                      fullWidth
                      placeholder={t('COMPANY_NAME')}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Divider className="m-20" />
            <Typography style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>
              {t('CUSTOMER_INFORMATION')}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>{t('CUSTOMER_NAME')}</Typography>
                <Controller
                  name="customerName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      type="text"
                      //  error={!!errors.contentUser}
                      //  helperText={errors?.contentUser?.message}
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Project Name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('CUSTOMER_EMAIL')}</Typography>
                <Controller
                  name="customerEmail"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      type="text"
                      //  error={!!errors.contentUser}
                      //  helperText={errors?.contentUser?.message}
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Project Name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('CUSTOMER_PHONE_NUMBER')}</Typography>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      type="text"
                      //  error={!!errors.contentUser}
                      //  helperText={errors?.contentUser?.message}
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Project Name"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Divider className="m-20" />
            <Typography style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>
              {t('WORKING_INFORMATION')}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>{t('START_DATE')}</Typography>
                <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      type="text"
                      //  error={!!errors.contentUser}
                      //  helperText={errors?.contentUser?.message}
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Project Name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="untilNow"
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormControlLabel label="Until now" control={<Checkbox {...field} />} />
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('COMMITED_HOURS')}</Typography>
                <Controller
                  name="commitedHours"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      type="text"
                      //  error={!!errors.contentUser}
                      //  helperText={errors?.contentUser?.message}
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Project Name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('TECHNOLOGY')}</Typography>
                <Controller
                  name="technology"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      autoFocus
                      type="text"
                      //  error={!!errors.contentUser}
                      //  helperText={errors?.contentUser?.message}
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Project Name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('NEEDED_DEVELOPER')}</Typography>
                <Controller
                  name="neededDeveloper"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      type="text"
                      //  error={!!errors.contentUser}
                      //  helperText={errors?.contentUser?.message}
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Project Name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('WORKING_DEVELOPERS')}</Typography>
                <Controller
                  name="workingDeveloper"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      autoFocus
                      type="text"
                      //  error={!!errors.contentUser}
                      //  helperText={errors?.contentUser?.message}
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Project Name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('BELONGS_TO_PARTNER')}</Typography>
                <Controller
                  name="partner"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      autoFocus
                      type="text"
                      //  error={!!errors.contentUser}
                      //  helperText={errors?.contentUser?.message}
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Project Name"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('PROJECT_TYPE')}</Typography>
                <Controller
                  name="projectType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      autoFocus
                      type="text"
                      //  error={!!errors.contentUser}
                      //  helperText={errors?.contentUser?.message}
                      variant="outlined"
                      required
                      fullWidth
                      placeholder="Project Type"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className="rounded">
            <Typography
              style={{ fontSize: '20px', fontWeight: 600, padding: '20px 20px 0px 20px' }}
            >
              {t('LOGO')}
            </Typography>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.1 } }}
              style={{ padding: '20px', textAlign: 'center' }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <BtnChangeAvatar
                    onClick={() => {
                      document.getElementById('newAvatar').click();
                    }}
                    className="w-40 h-40 -mx-12 p-0"
                    size="large"
                  >
                    <Icon className="text-20 arrow-icon" color="inherit">
                      photo_camera
                    </Icon>
                  </BtnChangeAvatar>
                }
              >
                <Avatar
                  sx={{
                    borderWidth: 4,
                    borderStyle: 'solid',
                    borderColor: 'background.default',
                  }}
                  className="w-128 h-128"
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : user?.photoURL
                      ? user?.photoURL
                      : 'assets/images/avatars/profile.jpg'
                  }
                />
              </Badge>
            </motion.div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default AddProject;
