import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import reducer from '../store';
import ListItemsInApp from './ListItemsInApp';
import { fetchListRolesAndItems } from '../store/manageRoleForItemSlice';

function ManageRoleForItem() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListRolesAndItems());
  }, []);

  return (
    <div>
      <ListItemsInApp />
    </div>
  );
}

export default withReducer('manageRoleForItem', reducer)(ManageRoleForItem);
