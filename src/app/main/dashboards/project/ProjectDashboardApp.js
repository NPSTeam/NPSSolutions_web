import FusePageSimple from '@fuse/core/FusePageSimple';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ProjectDashboardAppHeader from './ProjectDashboardAppHeader';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import TeamTab from './tabs/team/TeamTab';
import { getWorkspace } from './store/workspacesSlice';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));

function ProjectDashboardApp(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspace({ dispatch }));
  }, [dispatch]);

  const widgets = useSelector(selectWidgets);

  const [tabValue, setTabValue] = useState(0);
  const targetWorkspace = useSelector(
    ({ projectDashboardApp }) => projectDashboardApp.workspaces.targetWorkspace
  );

  const listWorkspace = useSelector(
    ({ projectDashboardApp }) => projectDashboardApp.workspaces.listWorkspace
  );

  console.log('listWorkspace', listWorkspace);

  useEffect(() => {
    if (!_.isEmpty(listWorkspace)) {
      dispatch(getWidgets(listWorkspace[0].workspaceId));
    }
  }, [dispatch, listWorkspace]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  if (_.isEmpty(widgets)) {
    return null;
  }

  return (
    <Root
      header={<ProjectDashboardAppHeader />}
      content={
        targetWorkspace && (
          <div className="w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
            <Tabs
              value={tabValue}
              onChange={handleChangeTab}
              indicatorColor="secondary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons={false}
              className="w-full px-24 -mx-4 min-h-40"
              classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
              TabIndicatorProps={{
                children: (
                  <Box
                    sx={{ bgcolor: 'text.disabled' }}
                    className="w-full h-full rounded-full opacity-20"
                  />
                ),
              }}
            >
              {/* <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                disableRipple
                label="Home"
              /> */}
              <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                disableRipple
                label="Team"
              />
            </Tabs>
            {/* {tabValue === 0 && <HomeTab />} */}
            {tabValue === 0 && <TeamTab />}
          </div>
        )
      }
    />
  );
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);
