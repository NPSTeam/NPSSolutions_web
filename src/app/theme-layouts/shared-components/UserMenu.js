import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import http from 'src/axios/ClassAxios';
import url from 'src/axios/url';
import history from '@history';

function UserMenu(props) {
  const user = useSelector(selectUser);
  // console.log('user', user);
  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {user.displayName}
          </Typography>
          {user?.roles && (
            <Typography className="text-11 font-medium capitalize" color="text.secondary">
              {user?.roles[0].toString()}
              {(!user?.roles || (Array.isArray(user?.role) && user?.role?.length === 0)) && 'Guest'}
            </Typography>
          )}
        </div>

        {user.photoURL ? (
          <Avatar
            className="md:mx-4"
            alt="user photo"
            src={user.photoURL}
            sx={{
              // backgroundColor: 'background.paper',
              color: 'text.secondary',
              border: '2px solid black',
              boxShadow: '0px 0px 4px black',
            }}
          />
        ) : (
          <Avatar
            className="md:mx-4"
            sx={{
              // backgroundColor: 'background.paper',
              color: 'text.secondary',
              border: '2px solid black',
              boxShadow: '0px 0px 4px black',
            }}
          >
            {user?.displayName}
          </Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {!user?.roles || user?.roles.length === 0 ? (
          <>
            {/* <MenuItem component={Link} to="/sign-in" role="button"> */}
            <MenuItem component={Link} to="/login" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </MenuItem>
            <MenuItem component={Link} to="/sign-up" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user-add </FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign up" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/apps/my-profile" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </MenuItem>
            <MenuItem component={Link} to="/apps/mailbox" onClick={userMenuClose} role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:mail-open</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </MenuItem>
            <MenuItem
              component={NavLink}
              to="/sign-out"
              onClick={() => {
                userMenuClose();

                http.post(url.logout, { withCredentials: true });
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('language');
                setTimeout(() => {
                  history.push('/login');
                }, 1000);
              }}
            >
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
