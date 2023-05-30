import { Typography } from '@mui/material';
import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import reducer from './store';
import { checkUser } from './store/redirectSlice';

function Redirect() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);
  return <Typography>Redirecting...</Typography>;
}

export default withReducer('redirect', reducer)(Redirect);
