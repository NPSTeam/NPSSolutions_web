import withReducer from 'app/store/withReducer';
import reducer from '../store';
import Header from './Header';
import ListRolesApp from './ListRolesApp';

function ManageRolesApp() {
  return (
    <div>
      <Header />
      <ListRolesApp />
    </div>
  );
}

export default withReducer('manageRolesApp', reducer)(ManageRolesApp);
