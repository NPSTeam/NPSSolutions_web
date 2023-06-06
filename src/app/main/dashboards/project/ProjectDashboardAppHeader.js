import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectUser } from 'app/store/userSlice';
import { Chip } from '@mui/material';
import { setTargetWorkspace } from './store/workspacesSlice';

function ProjectDashboardAppHeader(props) {
  const dispatch = useDispatch();
  // const projects = useSelector(selectProjects);
  const listWorkspace = useSelector(
    ({ projectDashboardApp }) => projectDashboardApp.workspaces.listWorkspace
  );
  const targetWorkspace = useSelector(
    ({ projectDashboardApp }) => projectDashboardApp.workspaces.targetWorkspace
  );

  console.log('listWorkspace', listWorkspace);
  const user = useSelector(selectUser);

  if (_.isEmpty(listWorkspace)) {
    return null;
  }

  const handleChipClick = (workspace) => {
    dispatch(setTargetWorkspace(workspace.workspaceId));
  };

  return (
    <div className="flex flex-col w-full px-24 sm:px-32">
      <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
        <div className="flex flex-auto items-center min-w-0">
          <Avatar className="flex-0 w-64 h-64" alt="user photo" src={user?.photoURL}>
            {user?.displayName[0]}
          </Avatar>
          <div className="flex flex-col min-w-0 mx-16">
            <Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
              {`${user.displayName}`}
            </Typography>

            <div className="flex items-center">
              <FuseSvgIcon size={20} color="action">
                heroicons-solid:user-circle
              </FuseSvgIcon>
              <Typography className="mx-6 leading-6 truncate" color="text.secondary">
                {user.roles[0]}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {listWorkspace.map((workspace) => (
          <Chip
            key={workspace.workspaceId}
            label={workspace.name}
            className="mr-8 mb-8"
            color="primary"
            onClick={() => handleChipClick(workspace)}
            variant={targetWorkspace === workspace.workspaceId ? 'default' : 'outlined'}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectDashboardAppHeader;
