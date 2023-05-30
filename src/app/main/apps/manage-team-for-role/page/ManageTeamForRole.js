import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import reducer from '../store';
import ListItemsInApp from './ListItemsInApp';
import { fetchListTeamsAndRoles } from '../store/manageTeamForRoleSlice';

function ManageTeamForRole() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListTeamsAndRoles());
  }, []);

  return (
    <div>
      <ListItemsInApp />
    </div>
  );
}

export default withReducer('manageTeamForRole', reducer)(ManageTeamForRole);
