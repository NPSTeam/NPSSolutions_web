/* eslint-disable no-nested-ternary */
import { Button, Typography, useMediaQuery } from '@mui/material';
import history from '@history';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Banner = () => {
  const screenNonHd = useMediaQuery('(max-width:1366px)');
  const screenFullHd = useMediaQuery('(max-width:1920px)');

  const firstLine = 'Optimal and effective work';
  const secondLine = 'management solution';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
      id="home"
    >
      {/* <Overlay /> */}
      <Container bg="assets/images/bannerNPS.png">
        <div className="block-text-banner text-white relative" style={{ paddingLeft: '15rem' }}>
          <div
            className="flex flex-col"
            style={{
              width: 'fit-content',
            }}
          >
            <p
              style={{
                fontSize: '6.4rem',
                fontWeight: '700',
                color: '#2622FF',
              }}
            >
              NPSSolutions
            </p>

            <div
              className="flex text-center justify-center pb-16 w-9/12"
              style={{
                backgroundColor: '#2622FF',
              }}
            >
              <div className="w-full flex text-center justify-center ">
                <div
                  style={{ backgroundColor: '#ffffff' }}
                  className="w-full h-0 border-2 rounded-12  opt-1"
                />
              </div>
            </div>
          </div>

          <div>
            {firstLine.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }} // Trạng thái ban đầu của chữ cái (ẩn)
                animate={{ opacity: 1 }} // Trạng thái sau khi hiển thị (hiển thị)
                transition={{ duration: 0.5, delay: index * 0.01 }} // Thời gian và độ trễ của hiệu ứng
                style={{ fontSize: '3rem', fontWeight: '400', color: '#2A5DDF' }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <div className="pb-16">
            {secondLine.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }} // Trạng thái ban đầu của chữ cái (ẩn)
                animate={{ opacity: 1 }} // Trạng thái sau khi hiển thị (hiển thị)
                transition={{ duration: 0.5, delay: index * 0.01 }} // Thời gian và độ trễ của hiệu ứng
                style={{ fontSize: '3rem', fontWeight: '400', color: '#2A5DDF' }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          <div className="h-full flex flex-col justify-left gap-10">
            <Button
              sx={{
                borderRadius: '6px',
                background: 'linear-gradient(33.28deg, #1D5CFE 16.9%, #35B6FF 93.47%)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                width: '20rem',
                height: '4rem',
              }}
              onClick={() => history.push('/login')}
            >
              <Typography
                variant="h6"
                className="text-white"
                sx={{
                  fontSize: '1.6rem',
                  fontWeight: '600',

                  fontFamily: 'Roboto, "Helvetica", "Arial", sans-serif',
                }}
              >
                Try for free
              </Typography>
            </Button>

            <Button
              sx={{
                borderRadius: '6px',
                background: 'linear-gradient(33.28deg, #1D5CFE 16.9%, #c2f12a 93.47%)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                width: '20rem',
                height: '4rem',
              }}
              onClick={() => history.push('/login')}
            >
              <Typography
                variant="h6"
                className="text-white"
                sx={{
                  fontSize: '1.6rem',
                  fontWeight: '600',

                  fontFamily: 'Roboto, "Helvetica", "Arial", sans-serif',
                }}
              >
                Download Mobile App
              </Typography>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
const Container = styled.div`
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  background-image: url(${({ bg }) => bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(83, 83, 83, 0.3);
`;

export default Banner;
