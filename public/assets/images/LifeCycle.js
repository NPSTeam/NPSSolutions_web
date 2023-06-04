import { useEffect, useRef, useState } from 'react';
import './lifeCycle.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';

import './styles-slider-product-skyeye.css';

// import required modules
import { Autoplay } from 'swiper';
import { Box, IconButton, Typography } from '@mui/material';

const LifeCycle = () => {
  const dataSlide = [
    {
      id: 0,
      title: '',
      description: '',
      image: 'LifeCycleStudio',
    },
    {
      id: 1,
      title: 'Data Import',
      description:
        'Importing data to Skyeye Studio by uploading data files, or importing data from database, or data synchronization',
      image: 'DataImport',
    },
    {
      id: 2,
      title: 'Data Annotation',
      description:
        'Labeling individual elements of data, with different types including 3D point cloud, images, 2D & 3D fusion data',
      image: 'DataAnnotation',
    },
    {
      id: 3,
      title: 'Task Management',
      description:
        'Enable users to define and manage tasks, or activities related to their data-centric workflows',
      image: 'TaskManagement',
    },
    {
      id: 4,
      title: 'Data Curation',
      description:
        'The process of selecting, organizing, and managing data to ensure that it is accurate, consistent, and usable for analysis and machine learning',
      image: 'DataCuration',
    },
    {
      id: 5,
      title: 'Model Training',
      description:
        'Enable users to preprocess and transform data, select appropriate algorithms, and configure hyperparameters and provides visualization tools.',
      image: 'ModelTraining',
    },
    {
      id: 6,
      title: 'Model Evaluation',
      description:
        'Help users to assess the performance by evaluating metrics including accuracy, precision, recall, F1 score, and ROC AUC score.',
      image: 'ModelEvaluation',
    },
    {
      id: 7,
      title: 'Data Centric Model',
      description:
        "Enable users to develop accurate and reliable machine learning models by providing a centralized platform that could accelerate the development of users' data-driven application and improve results.",
      image: 'DataCentricModel',
    },
    {
      id: 8,
      title: 'Model In Production',
      description:
        'Enable users to deploy their machine learning models and provide a centralized platform that helps accelerate the development of data-driven, improve accuracy and reliability of machine learning models.',
      image: 'ModelInProduction',
    },
  ];

  const [currentTabData, setCurrentTabData] = useState(dataSlide[0]);

  const handleRectangleClick = (value) => {
    const index = dataSlide.findIndex((item) => item.image === value);

    setCurrentTabData(dataSlide[index]);
  };

  const swiperRef = useRef(null);
  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (currentTabData.id === 0) {
      const timeoutId = setTimeout(() => {
        setCurrentTabData(dataSlide[1]);
      }, 3000);

      return () => clearTimeout(timeoutId); // Clear the timeout when the component unmounts or when the effect is re-triggered
    }
  }, [currentTabData.id]);

  return (
    <div className="container">
      {currentTabData.id === 0 ? (
        <>
          <div
            className="rectangle"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleRectangleClick('task-management');
              }
            }}
            aria-label="task-management"
            onClick={() => handleRectangleClick('TaskManagement')}
          />
          <div
            className="rectangle"
            onClick={() => handleRectangleClick('DataAnnotation')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleRectangleClick();
              }
            }}
            aria-label="dataannotation"
          />
          <div
            className="rectangle"
            onClick={() => handleRectangleClick('DataCuration')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleRectangleClick();
              }
            }}
            aria-label="datacuration"
          />
          <div
            className="rectangle"
            onClick={() => handleRectangleClick('DataImport')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleRectangleClick();
              }
            }}
            aria-label="dataimport"
          />
          <div
            className="rectangle"
            onClick={() => handleRectangleClick('ModelInProduction')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleRectangleClick();
              }
            }}
            aria-label="modelinproduction"
          />
          <div
            className="rectangle"
            onClick={() => handleRectangleClick('ModelTraining')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleRectangleClick();
              }
            }}
            aria-label="modeltraining"
          />
          <div
            className="rectangle"
            onClick={() => handleRectangleClick('DataCentricModel')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleRectangleClick();
              }
            }}
            aria-label="datacentricmodel"
          />
          <div
            className="rectangle"
            onClick={() => handleRectangleClick('ModelEvaluation')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleRectangleClick();
              }
            }}
            aria-label="modelevaluation"
          />
          <img src="assets/images/LifeCycleStudio.png" alt="" />
        </>
      ) : (
        <Box
          className="w-full flex"
          sx={{
            padding: '5rem 5rem 5rem 15rem',
          }}
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            ref={swiperRef}
            modules={[Autoplay]}
            initialSlide={currentTabData.id}
            className="mySwiper"
            onSlideChange={(swiper) => setCurrentTabData(dataSlide[swiper.realIndex])}
            // css
            style={{
              // zIndex: 10,
              width: '60%',
            }}
          >
            {dataSlide.map((item) => (
              <SwiperSlide key={item.id}>
                <img
                  src={`assets/images/${item.image}.png`}
                  alt="d"
                  style={{
                    borderRadius: '6px',
                    position: 'relative',
                    width: '61rem',
                    height: '42.5rem',
                    margin: 'auto',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <Box
            className="info-current-lifecycle flex flex-col"
            width="40%"
            padding="5rem 0rem 5rem 6rem"
          >
            <Typography
              sx={{
                fontSize: '3rem',
                fontWeight: '600',
                color: '#2563EB',
                fontFamily: 'Poppins',
              }}
            >
              {dataSlide[currentTabData.id].title}
            </Typography>

            <Typography
              sx={{
                fontSize: '1.8rem',
                fontWeight: '400',
                color: '#000000',
                fontFamily: 'Poppins',
                textAlign: 'left',
                height: '20rem',
              }}
            >
              {dataSlide[currentTabData.id].description}
            </Typography>

            <Box className="flex">
              <IconButton onClick={goPrev}>
                <svg
                  width="43"
                  height="44"
                  viewBox="0 0 43 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.2285 1.19922H12.7702C5.18685 1.19922 0.666016 5.72005 0.666016 13.3034V30.7409C0.666016 38.3451 5.18685 42.8659 12.7702 42.8659H30.2077C37.791 42.8659 42.3118 38.3451 42.3118 30.7617V13.3034C42.3327 5.72005 37.8118 1.19922 30.2285 1.19922ZM25.2285 28.2826C25.8327 28.8867 25.8327 29.8867 25.2285 30.4909C24.916 30.8034 24.5202 30.9492 24.1243 30.9492C23.7285 30.9492 23.3327 30.8034 23.0202 30.4909L15.666 23.1367C15.0618 22.5326 15.0618 21.5326 15.666 20.9284L23.0202 13.5742C23.6243 12.9701 24.6243 12.9701 25.2285 13.5742C25.8327 14.1784 25.8327 15.1784 25.2285 15.7826L18.9785 22.0326L25.2285 28.2826Z"
                    fill="#2563EB"
                  />
                </svg>
              </IconButton>
              <IconButton onClick={goNext}>
                <svg
                  width="43"
                  height="43"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.7715 42.3633L30.2298 42.3633C37.8132 42.3633 42.334 37.8424 42.334 30.2591L42.334 12.8216C42.334 5.21745 37.8131 0.696617 30.2298 0.696617L12.7923 0.696619C5.20898 0.696619 0.68815 5.21745 0.688151 12.8008L0.688152 30.2591C0.667319 37.8425 5.18815 42.3633 12.7715 42.3633ZM17.7715 15.28C17.1673 14.6758 17.1673 13.6758 17.7715 13.0716C18.084 12.7591 18.4798 12.6133 18.8756 12.6133C19.2715 12.6133 19.6673 12.7591 19.9798 13.0716L27.334 20.4258C27.9382 21.03 27.9382 22.0299 27.334 22.6341L19.9798 29.9883C19.3757 30.5925 18.3757 30.5925 17.7715 29.9883C17.1673 29.3841 17.1673 28.3841 17.7715 27.78L24.0215 21.53L17.7715 15.28Z"
                    fill="#2563EB"
                  />
                </svg>
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default LifeCycle;
