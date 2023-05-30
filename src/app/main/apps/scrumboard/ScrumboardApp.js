import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import { getMembers } from './store/membersSlice';

function ScrumboardApp() {
  const dispatch = useDispatch();

  const workspaceId = useSelector(({ scrumboardApp }) => scrumboardApp.board?.workspaceId);
  useEffect(() => {
    // dispatch(getMembers());
    if (!workspaceId) return;
    dispatch(getMembers({ id: workspaceId, pageIndex: 0, pageSize: 100 }));
  }, [dispatch, workspaceId]);

  return <Outlet />;
}

export default withReducer('scrumboardApp', reducer)(ScrumboardApp);
