import withReducer from 'app/store/withReducer';
import reducer from '../store';
import Header from './Header';
import TeamList from './TeamList';

function Teams() {
  return (
    <div>
      <Header />
      <TeamList />
    </div>
  );
}

export default withReducer('teams', reducer)(Teams);
