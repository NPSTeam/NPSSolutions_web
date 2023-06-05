import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { closeDialog } from 'app/store/fuse/dialogSlice';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useNotification } from 'src/app/hook/hook';
import { updateUser, setIsEditUser } from '../../store/usersSlice';

const defaultValues = {
  username: '',
  email: '',
  phoneNumber: '',
  locked: false,
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

export default function AddUpdateUser() {
  const { t } = useTranslation('users');
  const { showNotification } = useNotification();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setIsEditUser(false));
    dispatch(closeDialog());
  };

  const initData = useSelector((state) => state.users.users.targetUser);
  const isEditUser = useSelector((state) => state.users.users.isEditUser);
  const schema = yup.object().shape({
    username: yup.string().required(t('YOU_MUST_ENTER_A_NAME')),
    email: yup.string().required(t('YOU_MUST_ENTER_A_CODE')),
  });
  const { control, formState, handleSubmit, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const keys = Object.keys(initData);
    keys.forEach((key) => setValue(key, initData[key]));
    // eslint-disable-next-line
  }, [initData]);

  const { isValid, dirtyFields, errors } = formState;

  const handleChangeActivedUser = (event) => {
    setValue('actived', event.target.value);
  };

  const submitByBtn = (data) => {
    if (data.id === null || data.id === undefined) {
      // dispatch(addUser({ data, showNotification, t }));
    } else {
      // const updateData = _.fromPairs(
      //   _.differenceWith(_.toPairs(data), _.toPairs(initData), _.isEqual)
      // );
      // if (!_.isEmpty(updateData)) {
      //   dispatch(updateUser({ id: initData.id, ...updateData, showNotification, t }));
      // }

      dispatch(updateUser({ id: initData.id, ...data, showNotification, t }));
    }
    handleClose();
  };

  return (
    <>
      <DialogTitle style={{ minWidth: '400px' }}>{t('USER_INFORMATION')}</DialogTitle>
      <DialogContent>
        <form style={{ paddingTop: 6 }} className="flex flex-col justify-center w-full">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                type="text"
                error={!!errors.code}
                helperText={errors?.code?.message}
                label={t('USERNAME')}
                color="secondary"
                InputProps={{
                  disabled: !!isEditUser,
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className="text-20" color="action">
                        user
                      </Icon>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                type="text"
                error={!!errors.email}
                helperText={errors?.email?.message}
                label={t('EMAIL')}
                color="secondary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Icon className="text-20" color="action">
                        user
                      </Icon>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            )}
          />

          <Controller
            name="locked"
            control={control}
            render={({ field }) => (
              <Box className="flex mb-10">
                <Typography component="div" sx={{ ml: 1, mt: 1, margin: 'auto 0' }}>
                  <Box component="span" sx={{ color: 'text.secondary' }}>
                    Locked
                  </Box>
                </Typography>

                <AntSwitch
                  {...field}
                  inputProps={{ 'aria-label': 'ant design' }}
                  sx={{
                    margin: 'auto 0',
                    ml: 1,
                  }}
                  onChange={(e) => {
                    setValue('locked', e.target.checked);
                  }}
                />
              </Box>
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          onClick={handleSubmit(submitByBtn)}
          type="button"
          disabled={(_.isEmpty(dirtyFields) && !isEditUser) || (!isValid && !isEditUser)}
          value="legacy"
        >
          {isEditUser ? t('EDIT') : t('ADD')}
        </Button>
        <Button color="error" onClick={handleClose}>
          {t('CANCEL')}
        </Button>
      </DialogActions>
    </>
  );
}
