import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import reducer from '../store';
import ListItemsInApp from './ListItemsInApp';
import { fetchListWorkspacesAndRoles } from '../store/manageWorkspaceForRoleSlice';

function ManageWorkspaceForRole() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListWorkspacesAndRoles());
  }, []);

  return (
    <div>
      <ListItemsInApp />
    </div>
  );
}

export default withReducer('manageWorkspaceForRole', reducer)(ManageWorkspaceForRole);
