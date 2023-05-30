import Card from '@mui/material/Card';
import { useTranslation } from 'react-i18next';

import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import JWTRegisterTab from './tabs/JWTRegisterTab';
import LanguageSwitcher from './LanguageSwitcher';

const Root = styled('div')(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,

  '& .Register-rightSection': {
    backgroundImage: `linear-gradient(90deg, #0A525e 5%, #02323e 95%);`,
    color: theme.palette.primary.contrastText,
  },
}));

function Register() {
  const { t } = useTranslation('register');

  return (
    <Root className="flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
      >
        <Card
          className="Register-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
          square
        >
          <CardContent className="flex flex-col justify-center w-full py-96 max-w-320">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center justify-center mb-32">
                {/* <img className="logo-icon w-128" src="assets/images/logo.png" alt="logo" /> */}
                <svg
                  width="30"
                  height="33"
                  viewBox="0 0 30 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9281 1.11021C13.0067 1.18545 13.0835 1.26293 13.164 1.3348C14.4688 2.48801 15.5065 3.9099 16.1976 5.66568C16.3133 5.96 16.4602 6.03295 16.7121 6.03057C18.2162 6.01852 19.7204 6.01433 21.2245 6.027C22.7589 6.04077 23.8798 6.92555 24.4743 8.55667C25.5846 11.6021 23.6582 14.3806 21.5574 14.4649C19.8203 14.5355 18.0793 14.4882 16.3403 14.5037C15.0834 14.5145 13.8227 14.4792 12.5705 14.5788C10.7766 14.7202 9.24915 15.6469 7.98997 17.152C6.11446 19.3912 5.34639 22.1118 5.77098 25.2228C6.16707 28.1192 7.52333 30.2903 9.63803 31.7948C9.70435 31.843 9.78108 31.8711 9.8834 31.9238C9.89186 31.762 9.90318 31.6429 9.90314 31.5216C9.90414 29.2171 9.89473 26.9138 9.90521 24.6093C9.90873 23.9026 9.87719 23.1711 10.0152 22.4958C10.3537 20.8282 11.7058 19.5556 13.154 19.5222C15.1156 19.4762 17.0782 19.5167 19.0407 19.4887C20.3185 19.4711 21.6105 19.639 22.8701 19.2799C25.8089 18.4412 27.8067 16.2986 28.6597 12.8734C29.8116 8.25715 27.8794 3.60095 24.1648 1.70186C23.3804 1.30117 22.5496 1.12185 21.7028 1.04141C21.4347 1.01571 21.1629 1.02372 20.893 1.02387C18.2484 1.02418 15.6048 1.02674 12.9612 1.02817C12.9499 1.05514 12.9395 1.08211 12.9281 1.11021Z"
                    fill="#60DAFA"
                  />
                  <path
                    d="M11.3355 12.9291C12.1738 12.8827 12.9438 12.8296 13.7139 12.8C14.2424 12.7796 14.7709 12.7929 15.3004 12.7938C15.4557 12.7948 15.5789 12.7723 15.574 12.5307C15.541 11.042 15.7032 9.53634 15.37 8.07133C14.5963 4.66158 12.7841 2.37247 9.94114 1.38152C5.97742 0.00115318 1.88306 2.53203 0.456083 7.13256C0.144019 8.1383 0.00815268 9.18441 0.00774382 10.2507C0.00673612 17.636 0.0123587 25.0213 0.0170339 32.4066C0.0173283 32.9897 0.0192227 32.9897 0.489974 32.9895C1.60576 32.9902 2.72248 32.974 3.83828 32.9983C4.18022 33.0049 4.26919 32.8824 4.26899 32.4812C4.25483 25.0813 4.25299 17.6814 4.2521 10.2826C4.25118 8.46918 5.13698 6.94973 6.5546 6.30758C8.82732 5.27744 11.3071 7.27189 11.3341 10.1572C11.3422 11.0763 11.3351 11.9954 11.3355 12.9291Z"
                    fill="#60DAFA"
                  />
                </svg>
              </div>
            </motion.div>
            <div className="flex flex-grow justify-start mb-5">
              <Typography className="text-28 font-900 text-black">{t('SIGN_UP')}</Typography>
            </div>
            <JWTRegisterTab />
          </CardContent>

          <div className="flex flex-col items-center justify-center pb-32">
            <div>
              <span className="font-normal mr-8">{t('ALREADY_HAVE_AN_ACCOUNT')}</span>
              <Link className="font-normal" to="/login">
                {t('LOGIN')}
              </Link>
            </div>
            <Link className="font-normal mt-8" to="/">
              {t('BACK_TO_DASHBOARD')}
            </Link>
          </div>
        </Card>

        <div className="relative Login-rightSection hidden md:flex flex-1 justify-end">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <Typography fontSize={37} fontWeight={700} lineHeight="40px" color="inherit">
                Welcome <br />
                to NPSSolutions!
              </Typography>
              <Typography fontSize={45} fontWeight={900} lineHeight="56px" color="secondary">
                NPS
              </Typography>
              <Typography fontSize={26} fontWeight={600} lineHeight="32px" color="secondary">
                Solutions
              </Typography>
            </motion.div>
          </div>
          <LanguageSwitcher />
        </div>
      </motion.div>
    </Root>
  );
}

export default Register;
