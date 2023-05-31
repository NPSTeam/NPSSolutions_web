import Box from '@mui/material/Box';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ServiceAIApp() {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#FFF', overflow: 'hidden' }}>
      <iframe
        src="https://d31e6b24a00ea19456.gradio.live"
        title="Full Screen ServiceAi"
        style={{ width: '100%', height: '100vh', border: 'none' }}
      />
    </Box>
  );
}

export default withReducer('serviceAI', reducer)(ServiceAIApp);
