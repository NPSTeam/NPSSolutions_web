import withReducer from 'app/store/withReducer';
import reducer from '../../store';
import Header from './Header';
import TableUser from './TableUser';

function ManageUser() {
  return (
    <div>
      <Header />
      <TableUser />
    </div>
  );
}

export default withReducer('workspaces', reducer)(ManageUser);
