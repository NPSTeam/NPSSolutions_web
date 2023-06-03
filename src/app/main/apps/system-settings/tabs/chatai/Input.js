import { yupResolver } from '@hookform/resolvers/yup';
// import { Configuration, OpenAIApi } from 'openai';
import { IconButton, Typography, Box, TextField, Divider } from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useNotification } from 'src/app/hook/hook';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { createChatContent } from '../../store/systemSettingsSlice';

const schema = yup.object().shape({
  contentAssistant: yup.string().required('You must enter anything'),
  contentUser: yup.string().required('You must enter anything'),
});

const defaultValues = {
  contentAssistant: '',
  contentUser: '',
};

export default function InputContent({ chatContentUser, chatContentAss }) {
  const { t } = useTranslation('workspaces');

  const dispatch = useDispatch();
  const { showNotification } = useNotification();

  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data) {
    console.log('content', data);
    dispatch(createChatContent({ data, showNotification, t }));
    reset();
    // dispatch(
    //   openDialog({
    //     children: <NotificationDialog />,
    //   })
    // );
  }
  const chatContent = useSelector(
    ({ systemSettingsApp }) => systemSettingsApp.systemSettings.content
  );
  return (
    <main className="main">
      <form
        name="chatAIForm"
        noValidate
        // className="flex flex-col justify-center w-full mt-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography width={100} textTransform="uppercase">
            User
          </Typography>
          <Controller
            name="contentUser"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                // minRows={6}
                multiline
                type="text"
                error={!!errors.contentUser}
                helperText={errors?.contentUser?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />
          <IconButton>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
        <Divider sx={{ margin: '12px 0' }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography width={100} textTransform="uppercase">
            Assistant
          </Typography>
          <Controller
            name="contentAssistant"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                // minRows={6}
                multiline
                error={!!errors.contentAssistant}
                helperText={errors?.contentAssistant?.message}
                variant="outlined"
                required
                fullWidth
              />
            )}
          />
          <IconButton>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center">
          <IconButton
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            type="submit"
            size="large"
          >
            <ControlPointIcon />
          </IconButton>
          <Typography>Add Message</Typography>
        </Box>
      </form>
    </main>
  );
}
