import * as React from 'react';
import Box from '@mui/material/Box';
import { Divider, Tab, Tabs, Typography } from '@mui/material';
import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import reducer from './store';
import AwsTab from './tabs/aws/AwsTab';
import EmailTab from './tabs/email/EmailTab';
import { getSystemSettings } from './store/systemSettingsSlice';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function SystemSettingsApp() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getSystemSettings());
  }, [dispatch]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          sx={{
            '& .MuiTabs-flexContainer': {
              justifyContent: 'space-around',
            },
          }}
        >
          <Tab label="AWS" {...a11yProps(0)} />
          <Divider orientation="vertical" flexItem />
          <Tab label="Email" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AwsTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EmailTab />
      </TabPanel>
    </Box>
  );
}

export default withReducer('systemSettingsApp', reducer)(SystemSettingsApp);
