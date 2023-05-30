import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { submitLoginByEmail } from 'src/app/auth/store/loginSlice';
import * as yup from 'yup';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
}));

const defaultValues = {
  username: '',
  password: '',
  rememberMe: false,
};

function JWTLoginTabByEmail() {
  const { t } = useTranslation('login');
  const dispatch = useDispatch();

  const login = useSelector((state) => state?.auth?.login);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required(t('PLEASE_ENTER_YOUR_USERNAME'))
      .matches(/^[a-zA-Z0-9]+$/, t('USERNAME_NOT_HAVE_SPECIAL_CHARACTER')),
    password: yup
      .string()
      .required(t('PLEASE_ENTER_YOUR_PASSWORD'))
      .min(1, t('PASSWORD_IS_TOO_SHORT_SHOULD_BE_4_CHARS_MINIMUM')),
  });

  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!login?.errors) return;
    setError('username', {});
    setError('password', {
      message: t('PLEASE_CHECK_YOUR_USERNAME_OR_PASSWORD'),
    });
  }, [login?.errors, setError]);

  console.log('login', login);

  const currentLanguageId = useSelector(({ i18n }) => i18n.language);

  useEffect(() => {
    // if currentLanguageId is not null, set it to Form's defaultValues
    if (currentLanguageId) {
      reset({
        ...defaultValues,
        languageId: currentLanguageId,
      });
    }
  }, [currentLanguageId, reset]);

  function onSubmit(model) {
    dispatch(submitLoginByEmail(model));
  }

  return (
    <div className="w-full">
      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              required
              autoFocus
              className="mb-16"
              type="text"
              error={!!errors.username}
              helperText={errors?.username?.message}
              label={t('USERNAME')}
              color="primary"
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
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              className="mb-16"
              label={t('PASSWORD')}
              type="password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              variant="outlined"
              InputProps={{
                className: 'pr-2',
                type: showPassword ? 'text' : 'password',
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} size="large">
                      <Icon className="text-20" color="action">
                        {showPassword ? 'visibility' : 'visibility_off'}
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          )}
        />
        <div className="flex justify-between">
          <div className="flex">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormControlLabel
                    label={t('REMEMBER')}
                    sx={{
                      color: '#212529',
                      fontWeight: '400',

                      '& .MuiFormControlLabel-label': {
                        fontSize: '1.4rem !important',
                      },
                    }}
                    control={<Checkbox size="small" {...field} />}
                  />
                </FormControl>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button component={Link} to="/forgot-password" color="secondary" sx={{ padding: 0 }}>
              {t('FORGOT_PASSWORD')}!
            </Button>
          </div>
        </div>
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

export default JWTLoginTabByEmail;
