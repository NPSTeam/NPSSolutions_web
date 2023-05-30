import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';

import { submitResetPassword } from 'src/app/auth/store/resetPasswordSlice';
import { useNotification } from 'src/app/hook/hook';
import { Link } from 'react-router-dom';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  otp: yup.string().required('You must enter otp'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const defaultValues = {
  otp: '',
  password: '',
  confirmPassword: '',
};

export default function InputPassword(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation('reset-password');
  const errorsResponse = useSelector(({ auth }) => auth?.resetPassword?.errorsResponse);
  const successReponse = useSelector(({ auth }) => auth?.resetPassword?.successReponse);

  const { showNotification } = useNotification();
  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [errorValidate, setErrorValidate] = useState(null);

  function onSubmit(data) {
    dispatch(submitResetPassword({ data, showNotification, t }));
    // dispatch(
    //   openDialog({
    //     children: <NotificationDialog />,
    //   })
    // );
  }

  return (
    <div className="w-full">
      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-16"
              type="text"
              label={t('OTP')}
              error={!!errors.otp}
              helperText={errors?.otp?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      vpn_key
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="Password"
              type="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      lock
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-24"
              label="Password (Confirm)"
              type="password"
              error={!!errors.confirmPassword}
              helperText={errors?.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon className="text-20" color="action">
                      lock
                    </Icon>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />

        {errorsResponse && (
          <div className="mb-16">
            <p className="text-red-500 flex justify-center p-3">{errorsResponse}</p>
          </div>
        )}

        {successReponse && (
          <div className="mb-16">
            <p className="text-green-500 flex justify-center p-3">
              {t('RESET_PASSWORD_SUCCESSFULLY')}
            </p>
            <Link className="font-normal" to="/login">
              <Button
                className="w-full mx-auto normal-case"
                variant="contained"
                color="primary"
                aria-label="Login"
              >
                {t('GO_TO_LOGIN')}
              </Button>
            </Link>
          </div>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-4"
          aria-label="CONFIRM"
          sx={{ display: successReponse ? 'none' : 'block' }}
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          {t('CONFIRM')}
        </Button>
      </form>
    </div>
  );
}
