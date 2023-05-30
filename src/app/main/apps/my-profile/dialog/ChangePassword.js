import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { closeDialog } from 'app/store/fuse/dialogSlice';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNotification } from 'src/app/hook/hook';
import * as yup from 'yup';
import { changePassword } from '../store/informationSlice';

const defaultValues = {
  password: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const { t } = useTranslation('myProfile');

  function confirmPassword() {
    // eslint-disable-next-line react/no-this-in-sfc
    return this.test('confirmPassword', function (value) {
      const { path, createError, parent } = this;
      if (!value) {
        return createError({ path, message: t('PLEASE_ENTER_YOUR_AGAIN_PASSWORD') });
      }

      if (value.length < 3) {
        return createError({ path, message: t('PASSWORD_IS_TOO_SHORT_SHOULD_BE_4_CHARS_MINIMUM') });
      }

      if (value !== parent.password) {
        return createError({ path, message: t('PASSWORD_IS_NO_MATCH') });
      }

      return true;
    });
  }
  yup.addMethod(yup.string, 'confirmPassword', confirmPassword);

  const schema = yup.object().shape({
    // oldPassword: yup
    //   .string()
    //   .required(t('PLEASE_ENTER_YOUR_OLD_PASSWORD'))
    //   .min(3, t('PASSWORD_IS_TOO_SHORT_SHOULD_BE_4_CHARS_MINIMUM')),
    password: yup
      .string()
      .required(t('PLEASE_ENTER_YOUR_NEW_PASSWORD'))
      .min(3, t('PASSWORD_IS_TOO_SHORT_SHOULD_BE_4_CHARS_MINIMUM')),
    confirmPassword: yup.string().confirmPassword(),
  });

  const dispatch = useDispatch();

  const { showNotification } = useNotification();

  const handleClose = () => {
    dispatch(closeDialog());
  };
  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  // const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showAgainPassword, setShowAgainPassword] = useState(false);

  const submitByBtn = (data) => {
    dispatch(changePassword({ ...data, showNotification, t }));
    handleClose();
  };
  return (
    <>
      <DialogTitle style={{ minWidth: '400px' }}>{t('CHANGE_PASSWORD')}</DialogTitle>
      <DialogContent>
        <form style={{ paddingTop: 6 }} className="flex flex-col justify-center w-full">
          {/* <Controller
            name="oldPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                label={t('OLD_PASSWORD')}
                type="password"
                error={!!errors.oldPassword}
                helperText={errors?.oldPassword?.message}
                variant="outlined"
                InputProps={{
                  className: 'pr-2',
                  type: showOldPassword ? 'text' : 'password',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowOldPassword(!showOldPassword)} size="large">
                        <Icon className="text-20" color="action">
                          {showOldPassword ? 'visibility' : 'visibility_off'}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            )}
          /> */}

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                label={t('NEW_PASSWORD')}
                type="password"
                error={!!errors.password}
                helperText={errors?.password?.message}
                variant="outlined"
                InputProps={{
                  className: 'pr-2',
                  type: showNewPassword ? 'text' : 'password',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowNewPassword(!showNewPassword)} size="large">
                        <Icon className="text-20" color="action">
                          {showNewPassword ? 'visibility' : 'visibility_off'}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                label={t('AGAIN_PASSWORD')}
                type="password"
                error={!!errors.confirmPassword}
                helperText={errors?.confirmPassword?.message}
                variant="outlined"
                InputProps={{
                  className: 'pr-2',
                  type: showAgainPassword ? 'text' : 'password',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowAgainPassword(!showAgainPassword)}
                        size="large"
                      >
                        <Icon className="text-20" color="action">
                          {showAgainPassword ? 'visibility' : 'visibility_off'}
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={handleSubmit(submitByBtn)}
          type="button"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          {t('SAVE')}
        </Button>
        <Button color="error" onClick={handleClose}>
          {t('CANCEL')}
        </Button>
      </DialogActions>
    </>
  );
};
export default ChangePassword;
