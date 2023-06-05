import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Icon,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { closeDialog } from 'app/store/fuse/dialogSlice';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
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
  fileName: '',
  image: '',
  technology: [],
};
const listTechnology = [
  {
    label: 'Python',
    value: 'Python',
  },
  {
    label: 'Vue3',
    value: 'Vue3',
  },
  {
    label: 'React',
    value: 'React',
  },
  {
    label: 'Angular',
    value: 'Angular',
  },
  {
    label: 'NodeJS',
    value: 'NodeJS',
  },
  {
    label: 'Java',
    value: 'Java',
  },
  {
    label: 'PHP',
    value: 'PHP',
  },
];

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
  const { watch, control, formState, handleSubmit, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const cardForm = watch();

  console.log('cardForm', cardForm);

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
  const [errorValidate, setErrorValidate] = useState(null);

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

          <Box sx={{ display: 'flex' }}>
            <Typography fontSize={10} marginRight={2}>
              {t('LOGO')}
            </Typography>
            <svg
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_716_5)">
                <path
                  d="M9.0002 7.9395L12.3208 11.121L11.2134 12.1823L9.78281 10.8112V15H8.2176V10.8098L6.78699 12.1823L5.6796 11.121L9.0002 7.9395ZM9.0002 1.6662e-08C10.3439 6.13275e-05 11.6408 0.473336 12.6442 1.32984C13.6476 2.18634 14.2875 3.36635 14.4425 4.6455C15.4162 4.89997 16.2657 5.47432 16.8425 6.26816C17.4192 7.06196 17.6865 8.02477 17.5976 8.9883C17.5088 9.95182 17.0694 10.8548 16.3564 11.5394C15.6433 12.224 14.7019 12.6466 13.6966 12.7335V11.223C14.0568 11.1737 14.4031 11.0562 14.7152 10.8772C15.0275 10.6983 15.2994 10.4616 15.5151 10.1808C15.7308 9.90007 15.8859 9.58099 15.9716 9.24214C16.0572 8.90329 16.0715 8.5515 16.0137 8.20729C15.9559 7.86311 15.8271 7.53337 15.6349 7.23739C15.4427 6.9414 15.1909 6.68505 14.8942 6.48334C14.5975 6.28163 14.2618 6.1386 13.9068 6.06255C13.5517 5.98654 13.1845 5.97904 12.8264 6.0405C12.9489 5.49367 12.9423 4.92746 12.807 4.38341C12.6717 3.83936 12.411 3.33119 12.0442 2.89615C11.6774 2.46111 11.2137 2.1102 10.6871 1.86915C10.1605 1.62809 9.58423 1.50298 9.0006 1.50298C8.41696 1.50298 7.84073 1.62809 7.31407 1.86915C6.78746 2.1102 6.32376 2.46111 5.95695 2.89615C5.59014 3.33119 5.32953 3.83936 5.19418 4.38341C5.05887 4.92746 5.05226 5.49367 5.17481 6.0405C4.4608 5.91199 3.72276 6.0606 3.12307 6.45356C2.52338 6.84656 2.11115 7.45174 1.97706 8.136C1.84298 8.82026 1.99802 9.52755 2.4081 10.1022C2.81816 10.677 3.44966 11.072 4.16368 11.2005L4.30455 11.223V12.7335C3.29924 12.6468 2.35773 12.2242 1.64456 11.5396C0.931387 10.8551 0.491929 9.95216 0.402982 8.98864C0.314036 8.02507 0.581264 7.06222 1.15796 6.26831C1.73466 5.47444 2.58414 4.90005 3.55793 4.6455C3.71266 3.36628 4.3526 2.18618 5.35603 1.32965C6.35949 0.473115 7.65643 -0.000102527 9.0002 1.6662e-08Z"
                  fill="#0A525E"
                />
              </g>
              <defs>
                <clipPath id="clip0_716_5">
                  <rect width="18" height="15" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Box>

          <>
            <Input
              className="mb-24"
              type="file"
              accept=".png, .jpg, .jpeg"
              label={t('AVATAR')}
              onChange={(e) => {
                const currentFile = e.target.files[0];
                const acceptedImageTypes = ['image/jpeg', 'image/png'];
                if (currentFile && acceptedImageTypes.includes(currentFile.type)) {
                  setErrorValidate(null);
                  // Convert to base64
                  const reader = new FileReader();
                  reader.readAsDataURL(currentFile);
                  reader.onload = () => {
                    console.log(reader.result);
                    console.log(e.target.files[0]?.name);
                    setValue('image', reader.result);
                    setValue('fileName', e.target.files[0]?.name);
                  };
                } else {
                  setErrorValidate('Only image files are accepted');
                }
              }}
              variant="outlined"
            />
            {errorValidate && (
              <Box sx={{ color: 'red', marginBottom: '10px' }}>{errorValidate}</Box>
            )}
          </>

          <Controller
            name="technology"
            control={control}
            render={({ field, value = getValues() }) => {
              return (
                <FormControl color="secondary" className="mb-16">
                  <InputLabel id="technology">{t('TECHNOLOGY')}</InputLabel>
                  <Select
                    {...field}
                    labelId="techno"
                    label={t('TECHNOLOGY')}
                    multiple
                    value={value.technology}
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
                    {listTechnology.map((item, index) => (
                      <MenuItem value={item.value} key={index}>
                        <Checkbox checked={value?.technology?.indexOf(item.value) > -1} />
                        <span>{item.value}</span>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }}
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

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mb-16"
                type="text"
                label={t('DESCRIPTION')}
                color="secondary"
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
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          {t('ADD')}
        </Button>
      </DialogActions>
    </>
  );
}
