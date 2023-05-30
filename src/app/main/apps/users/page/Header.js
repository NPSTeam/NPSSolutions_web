import { Checkbox, Icon, Input, MenuItem, Paper, Popover, Select } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import option from 'src/assets/icon/option.svg';

import { Controller, useForm } from 'react-hook-form';
import { setSearchContent, setUsersByPagination } from '../store/usersSlice';

const listColumn = ['Code', 'Name', 'Address'];

const delaySecond = process.env.SEARCH_DELAY_SECOND || 500;

const Header = () => {
  const { t } = useTranslation('users');

  const [searchTerm, setSearchTerm] = useState('');
  const [firstTime, setFirstTime] = useState(true);
  const dispatch = useDispatch();

  const { control, formState, handleSubmit, setValue, getValues } = useForm({
    mode: 'onChange',
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!firstTime) {
      const delayDebounceFn = setTimeout(() => {
        console.log(searchTerm);
        dispatch(setSearchContent(searchTerm));
        dispatch(setUsersByPagination());
      }, delaySecond);

      return () => clearTimeout(delayDebounceFn);
    }
    setFirstTime(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, dispatch]);

  const [anchorEl, setAnchorEl] = useState(null);

  const [openSelect, setOpenSelect] = useState(true);
  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="flex flex-1 items-center justify-between py-8 sm:p-24">
      <div className="flex flex-1  px-8 sm:px-12">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex p-4 items-center w-full max-w-512 h-48 px-16 py-4 shadow"
        >
          <Icon color="action">search</Icon>

          <Input
            placeholder={t('SEARCH_USER')}
            className="flex flex-1 px-16"
            disableUnderline
            fullWidth
            inputProps={{
              'aria-label': 'Search',
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Icon color="action" onClick={handleClick} role="button">
            <img src={option} alt="option" />
          </Icon>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Controller
              name="listColumn"
              control={control}
              render={({ field, value = getValues() }) => {
                return (
                  <Select
                    {...field}
                    // labelId="column"
                    // label={t('COLUMN')}
                    multiple
                    open={openSelect}
                    onClose={handleCloseSelect}
                    onOpen={handleOpenSelect}
                    value={value.listColumn || []}
                    renderValue={(selected) => {
                      return `Search with column: ${selected.join(', ')}`;
                    }}
                    onChange={(e) => {
                      setValue('listColumn', e.target.value);
                      console.log('listColumnSelect', e.target.value);
                    }}
                  >
                    {listColumn.map((item, index) => (
                      <MenuItem value={item} key={index}>
                        <Checkbox checked={value.listColumn?.indexOf(item) > -1} />
                        <span>{item}</span>
                      </MenuItem>
                    ))}
                  </Select>
                );
              }}
            />
          </Popover>
        </Paper>
      </div>
    </div>
  );
};

export default Header;
