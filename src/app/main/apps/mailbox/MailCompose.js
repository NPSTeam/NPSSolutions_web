import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete } from '@mui/material';
import MailAttachment from './MailAttachment';
import { sendEmail, setUsersByPagination } from './store/mailsSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  to: yup.string().required('You must enter an e-mail').email('You must enter a valid e-mail.'),
});

function MailCompose(props) {
  const { className } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUsersByPagination());
  }, [dispatch]);

  const [openDialog, setOpenDialog] = useState(false);

  const user = useSelector(({ auth }) => auth.user);
  const listUsersInSystem = useSelector(({ mailboxApp }) => mailboxApp.mails.listUsersInSystem);

  const { handleSubmit, formState, control, setValue, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      from: user.email,
      to: '',
      cc: [],
      bcc: [],
      subject: '',
      message: '',
    },
    resolver: yupResolver(schema),
  });

  const formValue = watch();

  const { isValid, dirtyFields, errors } = formState;
  console.log('form', formValue, isValid, dirtyFields);

  const { t } = useTranslation('mailboxApp');

  function handleOpenDialog() {
    setOpenDialog(true);
  }

  function handleCloseDialog() {
    setOpenDialog(false);
  }

  function handleDiscard() {
    setOpenDialog(false);
  }

  function onSubmit() {
    const newData = {
      ...formValue,
      type: 'mail',
      from: {
        avatar: user.photoURL,
        contact: `${user.displayName} <${user.email}>`,
      },
      to: formValue.to.email,
      cc: formValue.cc.map((item) => item.email),
      bcc: formValue.bcc.map((item) => item.email),
      date: new Date(),
      subject: formValue.subject,
      content: formValue.message,
      folder: 1,
    };

    console.log('newData', newData);

    dispatch(sendEmail(newData));
    setOpenDialog(false);
  }

  return (
    <div className={clsx('', className)}>
      <Button
        variant="contained"
        color="secondary"
        className="w-full"
        onClick={handleOpenDialog}
        startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
      >
        {t('COMPOSE')}
      </Button>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        scroll="body"
      >
        <AppBar position="static" color="secondary" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              New Message
            </Typography>
          </Toolbar>
        </AppBar>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <DialogContent classes={{ root: 'p-16 pb-0 sm:p-32 sm:pb-0' }}>
            <Controller
              name="from"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  label="From"
                  id="from"
                  variant="outlined"
                  fullWidth
                  inputProps={{ readOnly: true }}
                />
              )}
            />

            <Controller
              control={control}
              name="to"
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  className="mt-8 mb-16"
                  options={listUsersInSystem}
                  getOptionLabel={(option) => option.email}
                  disablePortal
                  renderInput={(params) => <TextField {...params} label="to" />}
                  onChange={(event, valueOption) => {
                    setValue('to', valueOption);
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="cc"
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={listUsersInSystem}
                  getOptionLabel={(option) => option.email}
                  disablePortal
                  multiple
                  className="mt-8 mb-16"
                  renderInput={(params) => <TextField {...params} label="CC" placeholder="CC" />}
                  onChange={(event, valueOption) => {
                    setValue('cc', valueOption);
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="bcc"
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  options={listUsersInSystem}
                  getOptionLabel={(option) => option.email}
                  disablePortal
                  multiple
                  className="mt-8 mb-16"
                  renderInput={(params) => <TextField {...params} label="BCC" placeholder="BCC" />}
                  onChange={(event, valueOption) => {
                    setValue('bcc', valueOption);
                  }}
                />
              )}
            />

            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  label="Subject"
                  id="subject"
                  name="subject"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Controller
              className="mt-8 mb-16"
              render={({ field }) => <WYSIWYGEditor {...field} />}
              name="message"
              control={control}
            />

            <div className="pt-8">
              <MailAttachment fileName="attachment-2.doc" size="12 kb" />
              <MailAttachment fileName="attachment-1.jpg" size="350 kb" />
            </div>
          </DialogContent>

          <DialogActions className="flex flex-col sm:flex-row sm:items-center justify-between py-16 sm:py-24 px-24">
            <div className="-mx-8">
              <IconButton>
                <FuseSvgIcon size={20}>heroicons-solid:paper-clip</FuseSvgIcon>
              </IconButton>

              <IconButton>
                <FuseSvgIcon size={20}>heroicons-solid:link</FuseSvgIcon>
              </IconButton>

              <IconButton>
                <FuseSvgIcon size={20}>heroicons-solid:emoji-happy</FuseSvgIcon>
              </IconButton>

              <IconButton>
                <FuseSvgIcon size={20}>heroicons-solid:photograph</FuseSvgIcon>
              </IconButton>
            </div>

            <div className="flex items-center space-x-8 mt-16 sm:mt-0">
              <Button className="" variant="outlined" color="secondary" onClick={handleDiscard}>
                Discard
              </Button>
              <Button className="" variant="outlined" color="secondary">
                Save as draft
              </Button>

              <Button
                className=""
                variant="contained"
                color="secondary"
                type="submit"
                // disabled={_.isEmpty(dirtyFields) || !isValid}
                onClick={onSubmit}
              >
                Send
              </Button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default MailCompose;
