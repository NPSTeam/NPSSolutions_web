import withReducer from 'app/store/withReducer';
import reducer from '../store';
import Header from './Header';
import WorkspaceList from './WorkspaceList';

function Workspaces() {
  return (
    <div>
      <Header />
      <WorkspaceList />
    </div>
  );
}

export default withReducer('workspaces', reducer)(Workspaces);
