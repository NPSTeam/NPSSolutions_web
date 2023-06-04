import { Box, Typography } from '@mui/material';

// Import Swiper React components

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';

import './styles-slider-product-skyeye.css';

// import required modules
import './fonts.css';
import TabDataLabeling from './TabDataLabeling';
import LifeCycle from './LifeCycle';

export default function SkyeyeStudio() {
  return (
    <div
      style={{
        height: 'fit-content',
        width: '100%',
        boxShadow: '4px 4px 30px rgba(0, 0, 0, 0.1)',
        borderRadius: '6px',
        background: '#FFFFFF',
        padding: '4rem 4rem 4rem 8rem',
        display: 'flex',
        flexDirection: 'column',
      }}
      id="skyeye-studio"
    >
      <Box className="header flex">
        <Typography
          sx={{
            fontSize: '3.6rem',
            fontWeight: '700',
            color: '#090914',
          }}
        >
          SKYEYE STUDIO
        </Typography>
      </Box>

      <Box className="description">
        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.8rem',
            fontWeight: '400',
            color: '#667085',
          }}
        >
          Powerful, self-serve product and growth analytics to help you convert, engage.
        </Typography>
      </Box>

      <Box className="life-cycle flex flex-col">
        <Typography
          sx={{
            fontFamily: 'Poppins, "Helvetica", "Arial", sans-serif',
            fontSize: '2.4rem',
            fontWeight: '600',
            padding: '5rem 0 0 5rem',
            color: '#2563EB',
          }}
        >
          Life cycle
        </Typography>

        <LifeCycle />

        <Typography
          sx={{
            fontFamily: 'Poppins, "Helvetica", "Arial", sans-serif',
            fontSize: '2.4rem',
            fontWeight: '600',
            paddingLeft: '5rem',
            color: '#2563EB',
          }}
        >
          Data Labeling
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.8rem',
            fontWeight: '400',
            color: '#667085',
          }}
        >
          The best quality data to fuel the best performing models.
        </Typography>
        <Box sx={{ width: '100%', display: 'flex' }}>
          <TabDataLabeling />
        </Box>
      </Box>
    </div>
  );
}
