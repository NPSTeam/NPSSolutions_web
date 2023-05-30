/* eslint-disable consistent-return */
import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { Button, Icon, InputAdornment, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { submitLoginByPhoneNumber } from 'app/auth/store/loginSlice';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { setLoginMethod } from '../store/loginSlice';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
  '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
    {
      display: 'none',
    },
}));

const defaultValues = {
  phoneNumber: '',
};

function JWTLoginTabByPhoneNumber() {
  const { t } = useTranslation('login');
  const dispatch = useDispatch();

  const login = useSelector((state) => state.auth.login);

  const schema = yup.object().shape({
    phoneNumber: yup
      .string()
      .required(t('PLEASE_ENTER_YOUR_PHONE_NUMBER'))
      .matches(/^\d{9,10}$/, t('YOU_MUST_ENTER_A_VALID_PHONE_NUMBER')),
  });

  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    login.firebaseErrors.forEach((error) => {
      setError('firebaseError', {
        type: 'manual',
        message: error.message,
      });
    });
  }, [login.firebaseErrors, setError]);

  async function onSubmit(data) {
    dispatch(submitLoginByPhoneNumber({ ...data, verifierID: 'recaptchaVerifier' }));
  }

  function handleOnClickLoginMethodSwitcher() {
    localStorage.setItem('loginMethod', 'BY_EMAIL');
    dispatch(setLoginMethod('BY_EMAIL'));
  }

  return (
    <div className="w-full">
      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              required
              autoFocus
              className="mb-16"
              type="number"
              error={!!errors.phoneNumber || !!errors.firebaseError}
              helperText={errors.phoneNumber?.message || errors.firebaseError?.message}
              label={t('PHONE_NUMBER')}
              color="primary"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className="flex items-center gap-x-4 pr-12">
                    <img className="w-20" src="assets/images/flags/vn.png" alt="vn" />
                    <span className="leading-none">+84</span>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      phone
                    </Icon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <div className="flex justify-between">
          <div className="flex">
            <Button
              color="secondary"
              sx={{ padding: 0 }}
              onClick={handleOnClickLoginMethodSwitcher}
            >
              {t('LOGIN_BY_EMAIL')}
            </Button>
          </div>
        </div>
        <div id="recaptchaVerifier" />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16"
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          {t('LOGIN')}
        </Button>
      </form>
    </div>
  );
}

export default JWTLoginTabByPhoneNumber;
