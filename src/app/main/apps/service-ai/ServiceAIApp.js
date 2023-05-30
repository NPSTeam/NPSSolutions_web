import Box from '@mui/material/Box';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ServiceAIApp() {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#FFF', overflow: 'hidden' }}>
      <iframe
        src="http://167.172.78.210:7860/"
        title="Full Screen ServiceAi"
        style={{ width: '100%', height: '100vh', border: 'none' }}
      />
    </Box>
  );
}

export default withReducer('serviceAI', reducer)(ServiceAIApp);
