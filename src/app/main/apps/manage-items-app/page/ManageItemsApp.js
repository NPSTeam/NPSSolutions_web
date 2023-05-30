import withReducer from 'app/store/withReducer';
import reducer from '../store';
import Header from './Header';
import ListItemsApp from './ListItemsApp';

function ManageItemsApp() {
  return (
    <div>
      <Header />
      <ListItemsApp />
    </div>
  );
}

export default withReducer('manageItemsApp', reducer)(ManageItemsApp);
