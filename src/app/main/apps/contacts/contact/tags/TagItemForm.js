import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItem from '@mui/material/ListItem';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useEffect } from 'react';
import { useDebounce } from '@fuse/hooks';
import _ from '@lodash';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { removeTag, updateTag } from '../../store/tagsSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a tag title'),
});

function NewTagForm(props) {
  const { tag, isLast } = props;
  const dispatch = useDispatch();

  const { control, formState, handleSubmit, reset, watch } = useForm({
    mode: 'onChange',
    defaultValues: tag,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const form = watch();

  useEffect(() => {
    reset(tag);
  }, [tag, reset]);

  const handleOnChange = useDebounce((_tag, _form) => {
    if (!_tag) {
      return;
    }
    if (form && !_.isEqual(_form, _tag)) {
      dispatch(updateTag({ ..._form }));
    }
  }, 300);

  useEffect(() => {
    handleOnChange(tag, form);
  }, [handleOnChange, tag, form]);

  function handleOnRemove() {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                All associated events will be removed.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => dispatch(closeDialog())} color="primary">
                Disagree
              </Button>
              <Button
                onClick={() => {
                  dispatch(removeTag(tag.id)).then(() => {
                    // dispatch(getEvents());
                  });
                  dispatch(closeDialog());
                }}
                color="primary"
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </>
        ),
      })
    );
  }

  return (
    <>
      <ListItem className="p-0 mb-16" dense>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className={clsx('flex flex-1')}
              error={!!errors.title}
              helperText={errors?.title?.message}
              placeholder="Create new tag"
              variant="outlined"
              InputProps={{
                endAdornment: !isLast && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleOnRemove}
                      className="w-32 h-32 p-0"
                      // aria-tag="Delete"
                      size="large"
                    >
                      <FuseSvgIcon color="action" size={20}>
                        heroicons-outline:trash
                      </FuseSvgIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </ListItem>
    </>
  );
}

export default NewTagForm;
