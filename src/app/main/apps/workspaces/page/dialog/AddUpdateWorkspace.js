import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import {
  Button,
  Checkbox,
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
import {
  addWorkspace,
  updateWorkspace,
  getListService,
  setIsEditWorkspace,
} from '../../store/workspacesSlice';

const defaultValues = {
  name: '',
  address: '',
  code: '',
  registerServices: [],
};
// const listService = ['Calendar', 'CheckInOut', 'Chat', 'Email', 'File', 'Note', 'Todo'];

export default function AddUpdateWorkspace() {
  const { t } = useTranslation('workspaces');
  const { showNotification } = useNotification();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setIsEditWorkspace(false));
    dispatch(closeDialog());
  };

  const initData = useSelector((state) => state.workspaces.workspaces.targetWorkspace);
  const isEditWorkspace = useSelector((state) => state.workspaces.workspaces.isEditWorkspace);

  const listService = useSelector((state) => state.workspaces.workspaces.listService);
  console.log('listService', listService);

  const schema = yup.object().shape({
    name: yup.string().required(t('YOU_MUST_ENTER_A_NAME')),
    code: yup.string().required(t('YOU_MUST_ENTER_A_CODE')),

    address: yup.string().required(t('YOU_MUST_ENTER_A_ADDRESS')),
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

  useEffect(() => {
    if (listService.length === 0) dispatch(getListService());
  }, [dispatch, listService]);

  const { isValid, dirtyFields, errors } = formState;

  const submitByBtn = (data) => {
    if (data.id === null || data.id === undefined) {
      dispatch(addWorkspace({ data, showNotification, t }));
    } else {
      // const updateData = _.fromPairs(
      //   _.differenceWith(_.toPairs(data), _.toPairs(initData), _.isEqual)
      // );
      // if (!_.isEmpty(updateData)) {
      //   dispatch(updateWorkspace({ id: initData.id, ...updateData, showNotification, t }));
      // }

      dispatch(updateWorkspace({ id: initData.id, ...data, showNotification, t }));
    }
    handleClose();
  };

  return (
    <>
      <DialogTitle style={{ minWidth: '400px' }}>{t('WORKSPACE_INFORMATION')}</DialogTitle>
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
                  disabled: !!isEditWorkspace,
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
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                type="text"
                error={!!errors.address}
                helperText={errors?.address?.message}
                label={t('ADDRESS')}
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
            name="registerServices"
            control={control}
            render={({ field, value = getValues() }) => {
              return (
                <FormControl color="secondary" className="mb-16">
                  <InputLabel id="registered_service">{t('REGISTERED_SERVICES_FIELD')}</InputLabel>
                  <Select
                    {...field}
                    labelId="registered_service"
                    label={t('REGISTERED_SERVICES_FIELD')}
                    multiple
                    value={value.registerServices}
                    renderValue={(selected) => selected.join(', ')}
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
                    {listService.map((item, index) => (
                      <MenuItem value={item.value} key={index}>
                        <Checkbox checked={value?.registerServices?.indexOf(item.value) > -1} />
                        <span>{item.value}</span>
                      </MenuItem>
                    ))}
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
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          {t('ADD')}
        </Button>
        <Button color="error" onClick={handleClose}>
          {t('CANCEL')}
        </Button>
      </DialogActions>
    </>
  );
}
