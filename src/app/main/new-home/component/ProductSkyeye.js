import { Box, Typography } from '@mui/material';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';

import './styles-slider-product-skyeye.css';

// import required modules
import { Autoplay, Pagination, Navigation, Thumbs, FreeMode } from 'swiper';
import { useState } from 'react';
import './fonts.css';

export default function ProductSkyeye() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const dataSlide = [
    {
      id: 0,
      title: 'Note',
      description:
        'From fleeting thoughts to everlasting wisdom, the note feature captures the essence of our minds, preserving knowledge and inspiring greatness',
      image: 'NoteApp',
    },
    {
      id: 1,
      title: 'Task',
      description:
        'Tasks transform dreams into accomplishments, and the task feature is the compass that guides us on the path to success',
      image: 'TaskApp',
    },
    {
      id: 2,
      title: 'Scrumboard',
      description:
        'Visualize progress, empower collaboration, and conquer projects with the scrumboard feature—the canvas for agile success',
      image: 'ScrumboardApp',
    },
    {
      id: 3,
      title: 'Mail',
      description:
        'Emails are the digital threads that weave our connections, bridging distances and fostering communication in the realm of bits and pixels',
      image: 'MailApp',
    },
    {
      id: 4,
      title: 'Chat',
      description:
        'Converse and collaborate effortlessly, as the chat feature becomes the gateway to seamless communication, bridging minds and nurturing connections',
      image: 'ChatApp',
    },
    {
      id: 5,
      title: 'AIService',
      description:
        'Unleash the power of artificial intelligence, where innovation and intelligence converge, paving the way for boundless possibilities and transformative experiences',
      image: 'AIServiceApp',
    },
  ];

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div
      style={{
        height: 'fit-content',
        width: '100%',
        boxShadow: '4px 4px 30px rgba(0, 0, 0, 0.1)',
        borderRadius: '6px',
        background: '#FFFFFF',
        padding: '4rem 4rem 6rem 8rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box className="header flex">
        <Typography
          sx={{
            fontSize: '3.6rem',
            fontWeight: '700',
            color: '#090914',
          }}
        >
          MAIN FEATURES
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

      <Box className="slider" position="relative">
        {' '}
        <Swiper
          spaceBetween={30}
          centeredSlides
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Autoplay, Pagination, Thumbs]}
          className="swiper-container-product-skyeye"
          onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
        >
          {dataSlide.map((item, index) => (
            <SwiperSlide key={index}>
              <Box className="slide">
                <Box className="slide-image">
                  <img src={`assets/images/${item.image}.png`} alt="d" />
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className="swiper-container-product-skyeye-thumb"
        >
          {dataSlide.map((item, index) => (
            <SwiperSlide
              key={index}
              className="thumb-slide"
              style={{
                // for hover
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <Box
                className="slide"
                style={{
                  border: activeSlideIndex === index ? '1px solid #66B8FF' : 'none',
                  height: '22.3rem',
                  padding: '2rem 1rem 2rem 2rem',
                  borderRadius: '6px',
                }}
              >
                <Box
                  className="slide-title"
                  sx={{
                    borderRadius: '4px',
                    background:
                      activeSlideIndex === index
                        ? 'linear-gradient(90.36deg, #EEEEEE -2%, #FDFFFE 96.16%)'
                        : '#FFF',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily:
                        activeSlideIndex === index
                          ? 'League Spartan, sans-serif'
                          : 'Poppins, sans-serif',
                      fontSize: activeSlideIndex === index ? '2.4rem' : '2rem',
                      fontWeight: '600',
                      color: activeSlideIndex === index ? '#2563EB' : '#000000',
                      textAlign: 'left',
                      paddingLeft: '1rem',
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>

                <Box className="slide-description">
                  <Typography
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '1.4rem',
                      fontWeight: '400',
                      color: '#343A40',
                      textAlign: 'left',
                      paddingTop: '1rem',
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </div>
  );
}
