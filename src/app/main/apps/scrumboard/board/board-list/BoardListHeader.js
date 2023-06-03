import { Controller, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { Box } from '@mui/system';
import { darken, styled } from '@mui/material/styles';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { FormControlLabel, Switch } from '@mui/material';
import { removeList, updateList } from '../../store/listsSlice';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a title'),
});

function BoardListHeader(props) {
  const { list, cardIds } = props;
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: list.title,
    },
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    if (!formOpen) {
      reset({
        title: list.title,
      });
    }
  }, [formOpen, reset, list.title]);

  useEffect(() => {
    if (formOpen && anchorEl) {
      setAnchorEl(null);
    }
  }, [anchorEl, formOpen]);

  function handleMenuClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleOpenForm(ev) {
    ev.stopPropagation();
    setFormOpen(true);
  }

  function handleCloseForm() {
    setFormOpen(false);
  }

  function onSubmit(newData) {
    const newDataTwo = { ...newData, boardId: list.boardId, id: list.id };
    dispatch(updateList({ id: list.id, newDataTwo }));
    handleCloseForm();
  }

  function handleSettingForm(listData) {
    console.log('handleSettingForm', listData);
  }

  return (
    <div {...props.handleProps}>
      <div className="flex items-center justify-between h-48 sm:h-56 px-12">
        <div className="flex items-center min-w-0">
          {formOpen ? (
            <ClickAwayListener onClickAway={handleCloseForm}>
              <form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      margin="none"
                      autoFocus
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              type="submit"
                              disabled={_.isEmpty(dirtyFields) || !isValid}
                              size="large"
                            >
                              <FuseSvgIcon>heroicons-outline:check</FuseSvgIcon>
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </form>
            </ClickAwayListener>
          ) : (
            <Typography className="text-14 font-medium cursor-pointer" onClick={handleOpenForm}>
              {list.title}
            </Typography>
          )}
        </div>
        <div className="flex items-center">
          <Box
            className="flex items-center justify-center min-w-24 h-24 mx-4 text-sm font-semibold leading-24 rounded-full"
            sx={{
              backgroundColor: (theme) =>
                darken(
                  theme.palette.background.default,
                  theme.palette.mode === 'light' ? 0.1 : 0.3
                ),
              color: 'text.secondary',
            }}
          >
            {cardIds?.length}
          </Box>
          <IconButton
            aria-owns={anchorEl ? 'actions-menu' : null}
            aria-haspopup="true"
            onClick={handleMenuClick}
            variant="outlined"
            size="small"
          >
            <FuseSvgIcon size={20}>heroicons-outline:dots-vertical</FuseSvgIcon>
          </IconButton>
          <Menu
            id="actions-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                dispatch(removeList(list.id));
              }}
            >
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Remove List" />
            </MenuItem>
            <MenuItem onClick={handleOpenForm}>
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:pencil</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Rename List" />
            </MenuItem>
            <MenuItem onClick={handleSettingForm(list)}>
              <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                label="Draggable"
              />
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default BoardListHeader;
