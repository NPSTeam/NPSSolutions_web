import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { Button, DialogActions, DialogContent, DialogTitle, Icon, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { closeDialog } from 'app/store/fuse/dialogSlice';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useNotification } from 'src/app/hook/hook';
import { updateUser, setIsEditUser } from '../../store/usersSlice';

const defaultValues = {
  username: '',
  email: '',
  phoneNumber: '',
};

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
