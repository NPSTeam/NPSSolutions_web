import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export default function DetailContentIndustry() {
  const targetIndustryCategory = useSelector(
    (state) => state.homePageNew.home.targetIndustryCategory
  );

  const [currentMenuContent, setCurrentMenuContent] = useState({});

  useEffect(() => {
    setCurrentMenuContent(targetIndustryCategory?.content?.listMenu[0]);
  }, [targetIndustryCategory]);

  return (
    <motion.div
      style={{
        background: '#FFFFFF',
        boxShadow: '4px 4px 30px rgba(0, 0, 0, 0.1)',
        padding: '4.8rem',
      }}
      key={targetIndustryCategory.category}
      initial={{ scale: 0.97 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box className="header flex">
        <Box
          sx={{
            margin: 'auto 0',
            padding: '0 1rem 0 1rem',
          }}
        >
          <svg
            width="17"
            height="28"
            viewBox="0 0 17 28"
            fill={targetIndustryCategory.mainColor}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.878906 24.9746L3.23891 27.3346L16.5722 14.0013L3.23891 0.667969L0.878906 3.02797L11.8522 14.0013L0.878906 24.9746Z"
              fill={targetIndustryCategory.mainColor}
            />
          </svg>
        </Box>
        <Typography
          sx={{
            fontSize: '2.8rem',
            fontWeight: '700',
            lineHeight: '45px',
            color: targetIndustryCategory.mainColor,
          }}
        >
          {targetIndustryCategory.category}
        </Typography>
      </Box>

      <Box className="description">
        <Typography
          sx={{
            fontFamily: 'Poppins, "Helvetica", "Arial", sans-serif',
            fontSize: '1.8rem',
            fontWeight: '400',
            fontStyle: 'italic',
            color: '#212529',
          }}
        >
          {targetIndustryCategory?.content?.description}
        </Typography>
      </Box>

      <Box className="list-menu-content w-full flex">
        <Box
          sx={{
            width: '40%',
            background: `no-repeat url("assets/images/${targetIndustryCategory.background}.png") center`,
          }}
        >
          {targetIndustryCategory?.content?.listMenu?.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                margin: '2rem 0 2rem 0',
                '&:hover': { cursor: 'pointer' },
              }}
              onClick={() => setCurrentMenuContent(item)}
            >
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ padding: '0.8rem 1rem 0 0' }}>
                  <svg
                    width="24"
                    height="20"
                    viewBox="0 0 24 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.73047 13.75C1.73047 16.5114 3.78962 18.75 6.32972 18.75H16.678C19.8531 18.75 22.4271 15.9518 22.4271 12.5C22.4271 9.04822 19.8531 6.25 16.678 6.25C16.6397 6.25 16.6014 6.25041 16.5633 6.25122C16.031 3.39781 13.7107 1.25 10.929 1.25C7.75385 1.25 5.17991 4.04822 5.17991 7.5C5.17991 7.97105 5.22784 8.42993 5.3187 8.87119C3.26497 9.37201 1.73047 11.3662 1.73047 13.75Z"
                      stroke={
                        currentMenuContent?.id === item?.id
                          ? targetIndustryCategory.mainColor
                          : '#ADB5BD'
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Box>

                <Box sx={{ display: 'flex' }}>
                  <Typography
                    sx={{
                      fontFamily: 'Poppins, "Helvetica", "Arial", sans-serif',
                      fontSize: '1.8rem',
                      fontWeight: '600',
                      color: currentMenuContent?.id === item?.id ? '#212529' : '#ADB5BD',
                      marginRight: '0.5rem',
                      lineHeight: currentMenuContent?.id === item?.id ? '1.5' : '1.1',
                      maxHeight: currentMenuContent?.id === item?.id ? 'none' : '3.6rem',
                      overflow: currentMenuContent?.id === item?.id ? 'none' : 'hidden',

                      textOverflow: 'ellipsis',
                      display: currentMenuContent?.id === item?.id ? 'inline' : '-webkit-box',
                      WebkitLineClamp: '2', // Chỉ hiển thị 2 dòng
                      WebkitBoxOrient: 'vertical', // Hiển thị theo chiều dọc
                    }}
                  >
                    {item.title}:{' '}
                    <span
                      style={{
                        fontFamily: 'Poppins,  sans-serif',
                        fontSize: '1.6rem',
                        fontWeight: '400',
                        color: currentMenuContent?.id === item?.id ? '#212529' : '#ADB5BD',
                        display: 'inline',
                        margin: 'auto',
                      }}
                    >
                      {item.description}
                    </span>
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          sx={{ width: '60%', position: 'relative', padding: '3rem 3rem  0 3rem' }}
          className="cha"
        >
          <motion.img
            className="con1"
            key={currentMenuContent?.image}
            src={`assets/images/${currentMenuContent?.image}.png`}
            alt="d"
            style={{
              borderRadius: '2rem',
              position: 'relative',
              zIndex: 10,
            }}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <FrontLayer imgBgColor={targetIndustryCategory.imgBgColor} className="con2" />
        </Box>
      </Box>
    </motion.div>
  );
}

const FrontLayer = styled.div`
  position: absolute;
  width: 30.8rem;
  height: 30.8rem;
  background: ${({ imgBgColor }) => imgBgColor};
  border-radius: 0px 19px 0px 0px;
  z-index: 9;
  top: 0.5rem;
  right: 3%;
`;
