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
import { getTeamForRoles, setListRoles, updateTeamForRoles } from '../store/manageTeamForRoleSlice';

export default function ListItemsInApp() {
  const { t } = useTranslation('manageTeamForRole');
  const dispatch = useDispatch();
  const listTeams = useSelector(
    (state) => state.manageTeamForRole.manageTeamForRoleSlice.listTeams
  );

  const listRoles = useSelector(
    (state) => state.manageTeamForRole.manageTeamForRoleSlice.listRoles
  );

  const [targetTeam, setTargetTeam] = useState(null);

  let listIdRoleChecked = [];
  listIdRoleChecked = listRoles.filter((item) => item.actived === true).map((item) => item.roleId);

  const handleToggleItem = (value) => () => {
    const currentIndex = listIdRoleChecked.indexOf(value);
    const newChecked = [...listIdRoleChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    listIdRoleChecked = newChecked;
    dispatch(
      setListRoles(
        listRoles.map((item) => ({ ...item, actived: listIdRoleChecked.includes(item.roleId) }))
      )
    );
  };

  const handleToggleAllItem = (roles) => () => {
    if (listIdRoleChecked.length === roles.length) {
      listIdRoleChecked = [];
    } else {
      listIdRoleChecked = roles.map((item) => item.roleId);
    }
    dispatch(
      setListRoles(
        listRoles.map((item) => ({ ...item, actived: listIdRoleChecked.includes(item.roleId) }))
      )
    );
  };

  const handleClickTeam = (teamId) => () => {
    setTargetTeam(teamId);
    dispatch(getTeamForRoles(teamId));
  };

  const handleSaveTeamForRoles = () => {
    dispatch(updateTeamForRoles({ teamId: targetTeam, roles: listIdRoleChecked }));
  };

  // Handle for search team by name
  const [searchTeam, setSearchTeam] = useState('');
  const [listTeamsSearch, setListTeamsSearch] = useState(listTeams);

  useEffect(() => {
    setListTeamsSearch(listTeams);
  }, [listTeams]);

  const handleSearchTeam = (event) => {
    setSearchTeam(event.target.value);
    setListTeamsSearch(
      listTeams.filter((role) => role.name.toLowerCase().includes(event.target.value.toLowerCase()))
    );
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
      listRoles.filter((item) =>
        item.roleName.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '2rem' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', margin: 'auto 0' }}>
          {t('SETTINGS_TEAM_AND_ROLE')}
        </Typography>

        <Button
          variant="contained"
          disabled={!targetTeam}
          sx={{
            display: 'flex',
            marginTop: '10px',
            margin: 'auto 0',
            backgroundColor: targetTeam ? '#035efc' : '#ccc',
            color: '#fff',
            '&:hover': {
              backgroundColor: targetTeam ? '#035efc' : '#ccc',
              color: '#fff',
              boxShadow: ' 0 0 0 0.2rem rgba(0,123,255,.5)',
            },
          }}
          onClick={handleSaveTeamForRoles}
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
              {t('LIST_TEAMS')}
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
              placeholder={t('SEARCH_TEAM')}
              value={searchTeam}
              onChange={handleSearchTeam}
              inputProps={{ 'aria-label': 'search roles' }}
            />
            {searchTeam ? (
              <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="clear search"
                onClick={() => {
                  setSearchTeam('');
                  setListTeamsSearch(listTeams);
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
              {listTeamsSearch?.map((team) => {
                const labelId = `checkbox-list-team-${team}`;
                return (
                  <ListItem key={team.id} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={handleClickTeam(team.id)}
                      dense
                      selected={targetTeam === team.id}
                      sx={{
                        '	&.Mui-selected': {
                          backgroundColor: '#035efc',

                          '&:hover': {
                            backgroundColor: '#035efc',
                          },
                        },
                        color: targetTeam === team.id ? '#fff' : '#000',
                        '&:hover': {
                          color: '#000',
                        },
                      }}
                    >
                      <ListItemText id={labelId} primary={team.name} />
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

          <ListItem key="select-all" sx={{ padding: 0 }}>
            <ListItemButton role={undefined} onClick={handleToggleAllItem(listRoles)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={listIdRoleChecked.length === listRoles.length}
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
              {listRolesSearch?.map((item) => {
                const labelId = `checkbox-list-item-${item}`;
                return (
                  <ListItem
                    key={item.roleId}
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
                      onClick={handleToggleItem(item.roleId)}
                      disabled={!targetTeam}
                      dense
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
                      <ListItemText id={labelId} primary={item.roleName} />
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
