import withReducer from 'app/store/withReducer';
import reducer from '../store';
import Header from './Header';
import UserList from './UserList';

function Users() {
  return (
    <div>
      <Header />
      <UserList />
    </div>
  );
}

export default withReducer('users', reducer)(Users);
