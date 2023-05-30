import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  ListSubheader,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Clear, Search } from '@mui/icons-material';
import { getRoleForItems, setListItems, updateRoleForItems } from '../store/manageRoleForItemSlice';

export default function ListItemsInApp() {
  const { t } = useTranslation('manageRoleForItem');
  const dispatch = useDispatch();
  const listRoles = useSelector(
    (state) => state.manageRoleForItem.manageRoleForItemSlice.listRoles
  );

  const listItems = useSelector(
    (state) => state.manageRoleForItem.manageRoleForItemSlice.listItems
  );

  const [targetRole, setTargetRole] = useState(null);

  let listIdItemChecked = [];
  listIdItemChecked = listItems.filter((item) => item.actived === true).map((item) => item.itemId);

  const handleToggleItem = (value) => () => {
    const currentIndex = listIdItemChecked.indexOf(value);
    const newChecked = [...listIdItemChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    listIdItemChecked = newChecked;
    dispatch(
      setListItems(
        listItems.map((item) => ({ ...item, actived: listIdItemChecked.includes(item.itemId) }))
      )
    );
  };

  const handleToggleAllItem = (items) => () => {
    if (listIdItemChecked.length === items.length) {
      listIdItemChecked = [];
    } else {
      listIdItemChecked = items.map((item) => item.itemId);
    }
    dispatch(
      setListItems(
        listItems.map((item) => ({ ...item, actived: listIdItemChecked.includes(item.itemId) }))
      )
    );
  };

  const handleClickRole = (roleId) => () => {
    setTargetRole(roleId);
    dispatch(getRoleForItems(roleId));
  };

  const handleSaveRoleForItems = () => {
    dispatch(updateRoleForItems({ roleId: targetRole, items: listIdItemChecked }));
  };

  // Handle for search role by name
  const [searchRole, setSearchRole] = useState('');
  const [listRolesSearch, setListRolesSearch] = useState(listRoles);

  useEffect(() => {
    setListRolesSearch(listRoles);
  }, [listRoles]);

  const handleSearchRole = (event) => {
    setSearchRole(event.target.value);
    setListRolesSearch(
      listRoles.filter((role) => role.name.toLowerCase().includes(event.target.value.toLowerCase()))
    );
  };

  // Handle for search item by name
  const [searchItem, setSearchItem] = useState('');
  const [listItemsSearch, setListItemsSearch] = useState(listItems);

  useEffect(() => {
    setListItemsSearch(listItems);
  }, [listItems]);

  const handleSearchItem = (event) => {
    setSearchItem(event.target.value);
    setListItemsSearch(
      listItems.filter((item) =>
        item.itemName.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '2rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', margin: 'auto 0' }}>
          {t('SETTINGS_ROLE_AND_ITEM')}
        </Typography>

        <Button
          variant="contained"
          disabled={!targetRole}
          sx={{
            display: 'flex',
            marginTop: '10px',
            margin: 'auto 0',
            backgroundColor: targetRole ? '#035efc' : '#ccc',
            color: '#fff',
            '&:hover': {
              backgroundColor: targetRole ? '#035efc' : '#ccc',
              color: '#fff',
              boxShadow: ' 0 0 0 0.2rem rgba(0,123,255,.5)',
            },
          }}
          onClick={handleSaveRoleForItems}
        >
          {t('SAVE')}
        </Button>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <List
          component="nav"
          aria-labelledby="list-role"
          subheader={
            <ListSubheader component="div" id="list-roles">
              {t('LIST_ROLES')}
            </ListSubheader>
          }
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            border: '0.25px solid #000',
            borderRadius: '5px',
            padding: '2rem',
          }}
        >
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 400,
              margin: '0 auto',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={t('SEARCH_ROLE')}
              value={searchRole}
              onChange={handleSearchRole}
              inputProps={{ 'aria-label': 'search roles' }}
            />
            {searchRole ? (
              <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="clear search"
                onClick={() => {
                  setSearchRole('');
                  setListRolesSearch(listRoles);
                }}
              >
                <Clear />
              </IconButton>
            ) : (
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <Search />
              </IconButton>
            )}
          </Paper>
          <Divider sx={{ padding: '1rem' }} />

          <List>
            <div
              style={{
                height: '50vh',
                overflowY: 'scroll',
              }}
            >
              {listRolesSearch?.map((role) => {
                const labelId = `checkbox-list-role-${role}`;
                return (
                  <ListItem key={role.id} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={handleClickRole(role.id)}
                      dense
                      selected={targetRole === role.id}
                      sx={{
                        '	&.Mui-selected': {
                          backgroundColor: '#035efc',

                          '&:hover': {
                            backgroundColor: '#035efc',
                          },
                        },
                        color: targetRole === role.id ? '#fff' : '#000',
                        '&:hover': {
                          color: '#000',
                        },
                      }}
                    >
                      <ListItemText id={labelId} primary={role.name} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </div>
          </List>
        </List>
        <Divider orientation="vertical" flexItem sx={{ padding: '1rem' }} />
        <List
          component="nav"
          aria-labelledby="list-item"
          subheader={
            <ListSubheader component="div" id="list-items">
              {t('LIST_ITEMS')}
            </ListSubheader>
          }
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            border: '0.25px solid #000',
            borderRadius: '5px',
            padding: '2rem',
          }}
        >
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 400,
              margin: '0 auto',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={t('SEARCH_ITEM')}
              value={searchItem}
              onChange={handleSearchItem}
              inputProps={{ 'aria-label': 'search items' }}
            />
            {searchItem ? (
              <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="clear search"
                onClick={() => {
                  setSearchItem('');
                  setListItemsSearch(listItems);
                }}
              >
                <Clear />
              </IconButton>
            ) : (
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <Search />
              </IconButton>
            )}
          </Paper>

          <ListItem key="select-all" sx={{ padding: 0 }}>
            <ListItemButton role={undefined} onClick={handleToggleAllItem(listItems)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={listIdItemChecked.length === listItems.length}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': 'checkbox-list-item-select-all' }}
                  sx={{
                    '&.Mui-checked': {
                      color: '#035efc',
                    },
                  }}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <Divider sx={{ padding: '1rem' }} />

          <List>
            <div
              style={{
                height: '50vh',
                overflowY: 'scroll',
              }}
            >
              {listItemsSearch?.map((item) => {
                const labelId = `checkbox-list-item-${item}`;
                return (
                  <ListItem
                    key={item.itemId}
                    // secondaryAction={
                    //   item.actived === true ? (
                    //     <Chip label={t('ACTIVE')} color="success" />
                    //   ) : (
                    //     <Chip label={t('INACTIVE')} color="error" />
                    //   )
                    // }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggleItem(item.itemId)}
                      dense
                      disabled={!targetRole}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={item.actived}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                          sx={{
                            '&.Mui-checked': {
                              color: '#035efc',
                            },
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={item.itemName} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </div>
          </List>
        </List>
      </Box>
    </Box>
  );
}
