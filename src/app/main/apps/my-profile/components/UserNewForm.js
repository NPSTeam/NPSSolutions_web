import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Icon,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { navbarToggle } from 'app/store/fuse/navbarSlice';
import { useTranslation } from 'react-i18next';
import { countries } from 'src/@mock-api/api/_countries';
import { DatePicker } from '@mui/x-date-pickers';
import * as yup from 'yup';
import MyProfile from '../MyProfile';
import { changeInformation } from '../store/informationSlice';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  // username: yup.string().required('You must enter display name'),
  // email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  // password: yup
  //   .string()
  //   .required('Please enter your password.')
  //   .min(8, 'Password is too short - should be 8 chars minimum.'),
  // confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function UserNewForm({ currentUser }) {
  const navigate = useNavigate();
  const user = useSelector(({ auth }) => auth.user);

  // const NewUserSchema = yup.object().shape({
  //   name: yup.string().required('Name is required'),
  //   email: yup.string().required('Email is required').email(),
  //   phoneNumber: yup.string().required('Phone number is required'),
  //   address: yup.string().required('Address is required'),
  //   country: yup.string().required('country is required'),
  //   company: yup.string().required('Company is required'),
  //   state: yup.string().required('State is required'),
  //   city: yup.string().required('City is required'),
  //   role: yup.string().required('Role Number is required'),
  //   avatarUrl: yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  // });

  // convert birthDay to MM/DD/YYYY
  const dateParts = user?.birthDay.split('/');
  const newDate = `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`;

  const defaultValues = useMemo(
    () => ({
      // name: currentUser?.name || '',
      // email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      // address: currentUser?.address || '',
      // country: currentUser?.country || '',
      // state: currentUser?.state || '',
      // city: currentUser?.city || '',
      // zipCode: currentUser?.zipCode || '',
      // avatarUrl: currentUser?.avatarUrl || '',
      // isVerified: currentUser?.isVerified || true,
      // status: currentUser?.status,
      // company: currentUser?.company || '',
      birthDay: newDate || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  // const methods = useForm({
  //   resolver: yupResolver(NewUserSchema),
  //   defaultValues,
  // });

  const dispatch = useDispatch();
  const { t } = useTranslation('myProfile');

  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  useEffect(() => {
    dispatch(navbarToggle());
  }, [dispatch]);

  function submit(data) {
    dispatch(changeInformation(data));
  }

  const [country, setCountry] = useState('Vietnam');

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card sx={{ py: 10, px: 3 }}>
          <MyProfile />
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <TextField name="name" label="Full Name" />
            {/* <Controller
              name="email"
              control={control}
              render={({ field }) => ( */}
            <TextField
              // {...field}
              className="mb-16"
              type="text"
              // error={!!errors.email}
              // helperText={errors?.email?.message}
              label={t('EMAIL')}
              value={user.email}
              readOnly
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      email
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            {/* )}
            /> */}
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-16"
                  sx={{ marginTop: '1.6rem' }}
                  type="text"
                  // value={user.phoneNumber}
                  error={!!errors.phoneNumber}
                  helperText={errors?.phoneNumber?.message}
                  label={t('PHONE_NUMBER')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className="text-20" color="action">
                          phone
                        </Icon>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                />
              )}
            />
            <TextField name="company" label="Company" sx={{ margin: 'auto 0' }} />

            {/* <Controller
              name="country"
              control={control}
              render={({ field }) => ( */}
            <Select
              // {...field}
              id="country-select"
              value={country}
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    height: '256px',
                    '& .MuiMenuItem-root': {
                      padding: 1,
                    },
                  },
                },
              }}
            >
              {countries?.map((option) => (
                <MenuItem key={option.code} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {/* )}
            /> */}

            <TextField name="state" label="State/Region" />
            <TextField name="city" label="City" />
            <TextField name="address" label="Address" />
            <TextField name="zipCode" label="Zip/Code" />
            <Controller
              name="birthDay"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Date of Birth"
                  // value={user?.birthDay}
                  onChange={(newValue) => {
                    newValue = newValue.toLocaleDateString('en-US');
                    field.onChange(newValue);
                    console.log('newValue', newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
            />
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" onClick={handleSubmit(submit)}>
              {t('Save Changes')}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
