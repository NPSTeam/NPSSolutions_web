import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { closeDialog } from 'app/store/fuse/dialogSlice';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useNotification } from 'src/app/hook/hook';
import { addRoleApp, updateRoleApp, setIsEditRoleApp } from '../../store/manageRolesAppSlice';

const defaultValues = {
  name: '',
  code: '',
  actived: true,
};

export default function AddUpdateRoleApp() {
  const { t } = useTranslation('manageRolesApp');
  const { showNotification } = useNotification();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setIsEditRoleApp(false));
    dispatch(closeDialog());
  };

  const listCheck = ['TRUE', 'FALSE'];

  const initData = useSelector((state) => state.manageRolesApp.manageRolesApp.targetRoleApp);
  const isEditRoleApp = useSelector((state) => state.manageRolesApp.manageRolesApp.isEditRoleApp);
  const isActivedRole = useSelector((state) => state.manageRolesApp.manageRolesApp.isActivedRole);
  const schema = yup.object().shape({
    name: yup.string().required(t('YOU_MUST_ENTER_A_NAME')),
    code: yup.string().required(t('YOU_MUST_ENTER_A_CODE')),
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

  const handleChangeActivedRole = (event) => {
    setValue('actived', event.target.value);
  };

  const submitByBtn = (data) => {
    if (data.id === null || data.id === undefined) {
      dispatch(addRoleApp({ data, showNotification, t }));
    } else {
      // const updateData = _.fromPairs(
      //   _.differenceWith(_.toPairs(data), _.toPairs(initData), _.isEqual)
      // );
      // if (!_.isEmpty(updateData)) {
      //   dispatch(updateRoleApp({ id: initData.id, ...updateData, showNotification, t }));
      // }

      dispatch(updateRoleApp({ id: initData.id, ...data, showNotification, t }));
    }
    handleClose();
  };

  return (
    <>
      <DialogTitle style={{ minWidth: '400px' }}>{t('ROLE_APP_INFORMATION')}</DialogTitle>
      <DialogContent>
        <form style={{ paddingTop: 6 }} className="flex flex-col justify-center w-full">
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                type="text"
                error={!!errors.code}
                helperText={errors?.code?.message}
                label={t('CODE')}
                color="secondary"
                InputProps={{
                  disabled: !!isEditRoleApp,
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
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                type="text"
                error={!!errors.name}
                helperText={errors?.name?.message}
                label={t('NAME')}
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
            name="actived"
            control={control}
            render={({ field, value = getValues() }) => {
              return (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">{t('ACTIVED_ROLE')}</InputLabel>
                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    onChange={handleChangeActivedRole}
                  >
                    <MenuItem value="true">{t('TRUE')}</MenuItem>
                    <MenuItem value="false">{t('FALSE')}</MenuItem>
                  </Select>
                </FormControl>
              );
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          onClick={handleSubmit(submitByBtn)}
          type="button"
          disabled={(_.isEmpty(dirtyFields) && !isEditRoleApp) || (!isValid && !isEditRoleApp)}
          value="legacy"
        >
          {isEditRoleApp ? t('EDIT') : t('ADD')}
        </Button>
        <Button color="error" onClick={handleClose}>
          {t('CANCEL')}
        </Button>
      </DialogActions>
    </>
  );
}
