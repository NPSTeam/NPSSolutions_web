import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import reducer from './store';
import { setLoginMethod } from './store/loginSlice';
import JWTLoginTabByEmail from './tabs/JWTLoginTabByEmail';

const Root = styled('div')(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '& .Login-rightSection': {
    backgroundImage: `linear-gradient(90deg, #4f46e5 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
  },
}));
const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.common.white,
}));

function Login() {
  const dispatch = useDispatch();

  const isVerified = useSelector((state) => state?.auth?.login?.isVerified);
  const loginMethod = useSelector((state) => state?.login?.login?.loginMethod);

  useEffect(() => {
    const storedLoginMethod = localStorage.getItem('loginMethod');
    if (storedLoginMethod) {
      dispatch(setLoginMethod(storedLoginMethod));
    }
  });

  return (
    <Root className="flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-800 md:max-w-5xl rounded-20 overflow-hidden"
      >
        <StyledCard
          className="Login-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
          square
        >
          <CardContent className="relative flex flex-col items-center justify-center w-full py-96 max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                {/* <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" /> */}
                <svg
                  width="125"
                  height="138"
                  viewBox="0 0 125 138"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M55.2777 1.44314C55.6139 1.76484 55.9421 2.09615 56.2865 2.40344C61.8652 7.33432 66.3022 13.414 69.2576 20.9214C69.7521 22.1798 70.38 22.4918 71.4573 22.4816C77.8886 22.43 84.32 22.4121 90.7513 22.4663C97.3123 22.5252 102.105 26.3083 104.647 33.2826C109.394 46.3042 101.157 58.1847 92.1746 58.5451C84.7471 58.8469 77.3032 58.6444 69.8675 58.7109C64.4932 58.757 59.1026 58.6062 53.7487 59.0319C46.0783 59.6366 39.5472 63.5988 34.1633 70.0345C26.144 79.6088 22.8599 91.2416 24.6753 104.543C26.3689 116.928 32.168 126.211 41.21 132.644C41.4936 132.85 41.8217 132.97 42.2592 133.196C42.2954 132.504 42.3438 131.995 42.3436 131.476C42.3479 121.622 42.3076 111.774 42.3524 101.92C42.3675 98.8985 42.2326 95.771 42.8228 92.8834C44.2699 85.7532 50.0512 80.3117 56.2435 80.169C64.6309 79.9723 73.0225 80.1455 81.414 80.0257C86.8774 79.9506 92.4018 80.6683 97.7877 79.1328C110.353 75.5469 118.895 66.3854 122.543 51.7403C127.468 32.002 119.206 12.093 103.323 3.97294C99.9694 2.25965 96.4173 1.49291 92.7965 1.14897C91.6503 1.03909 90.4879 1.07335 89.3337 1.07398C78.0262 1.0753 66.7227 1.08623 55.4193 1.09236C55.3707 1.20769 55.3262 1.32301 55.2777 1.44314Z"
                    fill="#60DAFA"
                  />
                  <path
                    d="M48.4684 51.9784C52.0525 51.7799 55.345 51.5528 58.6376 51.4265C60.8974 51.3391 63.1573 51.3958 65.4213 51.3997C66.0855 51.4042 66.6119 51.3079 66.5911 50.275C66.4502 43.9095 67.1436 37.4716 65.7189 31.2075C62.4108 16.6281 54.6623 6.84038 42.5062 2.6033C25.5582 -3.29885 8.05158 7.52264 1.95011 27.1935C0.615796 31.4939 0.0348591 35.9668 0.033111 40.526C0.0288022 72.104 0.052843 103.682 0.0728336 135.26C0.0740922 137.753 0.0821924 137.753 2.09503 137.752C6.86589 137.755 11.6408 137.686 16.4117 137.79C17.8737 137.818 18.2542 137.294 18.2533 135.579C18.1928 103.939 18.1849 72.2982 18.1811 40.6626C18.1772 32.9086 21.9647 26.4118 28.0261 23.6661C37.7438 19.2614 48.3468 27.7893 48.4624 40.1264C48.4968 44.0562 48.4664 47.9861 48.4684 51.9784Z"
                    fill="#60DAFA"
                  />
                </svg>
              </div>
            </motion.div>
            {loginMethod === 'BY_EMAIL' && <JWTLoginTabByEmail />}
            {/* {loginMethod === 'BY_PHONE_NUMBER' &&
              (isVerified ? <JWTLoginTabOTP /> : <JWTLoginTabByPhoneNumber />)} */}
          </CardContent>
          <div className="flex flex-col items-center justify-center pb-32">
            <div>
              <span className="font-normal mr-8">Don't have an account?</span>
              <Link className="font-normal" to="/register">
                Register
              </Link>
            </div>
          </div>
        </StyledCard>
        <div className="relative Login-rightSection hidden md:flex flex-1 justify-end">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <Typography
                variant="h3"
                color="inherit"
                className="font-bold leading-tight"
                sx={{ fontSize: '3rem' }}
              >
                Welcome <br />
                to!
              </Typography>
              <Typography
                variant="h3"
                className="font-black leading-tight"
                sx={{ color: '#A1DCC7', fontSize: '3.5rem' }}
              >
                NPSSolutions
              </Typography>
            </motion.div>
          </div>
          <LanguageSwitcher />
        </div>
      </motion.div>
    </Root>
  );
}

export default withReducer('login', reducer)(Login);
