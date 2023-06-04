import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import styled from 'styled-components';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';

import './styles-slider-product-skyeye.css';

// import required modules
import { Autoplay, Navigation } from 'swiper';

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabDataLabeling() {
  const [value, setValue] = React.useState(0);

  const dataSlide = [
    {
      id: 1,
      title: '3D',
      description:
        'The mapping function by AI and drone combines the data collected by drones with advanced machine learning algorithms to create accurate and detailed maps of physical spaces, providing valuable insights for a range of industries, including agriculture, construction, and environmental management.',
      image: ['TabLabeling_3D_1', 'TabLabeling_3D_2'],
    },
    {
      id: 2,
      title: '2D',
      description:
        'The build image 2D labeling function assigns semantic labels to individual objects within an image, providing a way to identify objects and regions of interest. This enables more accurate analysis and processing of the image data.',
      image: ['TabLabeling_2D_1', 'TabLabeling_2D_2'],
    },
    {
      id: 3,
      title: 'Mapping',
      description:
        'The mapping function by AI and drone combines the data collected by drones with advanced machine learning algorithms to create accurate and detailed maps of physical spaces, providing valuable insights for a range of industries, including agriculture, construction, and environmental management.',
      image: ['TabLabeling_Mapping_1', 'TabLabeling_Mapping_2'],
    },
  ];

  const [currentTabData, setCurrentTabData] = React.useState(dataSlide[0]);
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCurrentTabData(dataSlide[newValue]);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex' }}>
      <Box sx={{ display: 'flex', width: '30%' }}>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            zIndex: 30,
          }}
          className="detail-workspace"
        >
          <Box
            display="flex"
            flexDirection="column"
            flex={1}
            sx={{
              overflow: 'hidden',
            }}
          >
            <Box>
              <Box
                sx={{
                  borderColor: 'divider',
                  padding: '2rem 2rem 0rem 3rem',
                  backgroundColor: '#FFF',
                  boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.05)',
                  borderRadius: '6px',
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="tab-workspace"
                  sx={{
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#0243EC',
                    },
                  }}
                >
                  <Tab
                    label="3D"
                    {...a11yProps(0)}
                    sx={{
                      color: '#000000',
                      fontSize: '16px',
                      fontWeight: value === 0 ? '600' : '400',
                    }}
                  />
                  <Tab
                    label="2D"
                    {...a11yProps(1)}
                    sx={{
                      color: '#000000',
                      fontSize: '16px',
                      fontWeight: value === 1 ? '600' : '400',
                    }}
                  />
                  <Tab
                    label="Mapping"
                    {...a11yProps(2)}
                    sx={{
                      color: '#000000',
                      fontSize: '16px',
                      fontWeight: value === 2 ? '600' : '400',
                    }}
                  />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <Typography
                  sx={{
                    fontSize: '1.6rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '400',
                    color: '#667085',
                    textAlign: 'left',
                    paddingTop: '2rem',
                  }}
                >
                  {dataSlide[0].description}
                </Typography>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Typography
                  sx={{
                    fontSize: '1.6rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '400',
                    color: '#667085',
                    textAlign: 'left',
                    paddingTop: '2rem',
                  }}
                >
                  {dataSlide[1].description}
                </Typography>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Typography
                  sx={{
                    fontSize: '1.6rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '400',
                    color: '#667085',
                    textAlign: 'left',
                    paddingTop: '2rem',
                  }}
                >
                  {dataSlide[2].description}
                </Typography>
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '65%', padding: '3rem 0rem 3rem 15rem' }} className="cha">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation
          modules={[Navigation, Autoplay]}
          className="swiper-tab-data-labeling"
          onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
          style={{
            width: '90%',
          }}
        >
          <SwiperSlide
            style={{
              position: 'relative',
            }}
          >
            <img
              src={`assets/images/${currentTabData.image[0]}.png`}
              alt="d"
              style={{
                borderRadius: '6px',
                position: 'relative',
                width: '51rem',
                height: '42.5rem',
                margin: 'auto',
                zIndex: 10,
              }}
            />
            {/* <FrontLayer
              imgBgColor={currentTabData.image[activeSlideIndex === 0 ? 1 : 0]}
              className="con2"
            /> */}
          </SwiperSlide>

          <SwiperSlide
            style={{
              position: 'relative',
            }}
          >
            <img
              src={`assets/images/${currentTabData.image[1]}.png`}
              alt="d"
              style={{
                borderRadius: '6px',
                position: 'relative',
                width: '51rem',
                height: '42.5rem',
                margin: 'auto',
                zIndex: 10,
              }}
            />
            {/* <FrontLayer
              imgBgColor={currentTabData.image[activeSlideIndex === 0 ? 1 : 0]}
              className="con2"
            /> */}
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  );
}

const FrontLayer = styled.div`
  position: absolute;
  width: 30.8rem;
  height: 30.8rem;
  background: url('assets/images/${({ imgBgColor }) => imgBgColor}.png') center center no-repeat;
  border-radius: 0px 19px 0px 0px;
  z-index: 9;
  filter: blur(10px);
  top: 5.5rem;
  right: 8%;
`;
