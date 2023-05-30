import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import i18n from 'i18next';
import FormSubmitEmail from './components/FormSubmitEmail';
import en from './i18n/en';
import vi from './i18n/vi';
import reducer from './store';

i18n.addResourceBundle('en', 'forgotPassword', en);
i18n.addResourceBundle('vi', 'forgotPassword', vi);

const Root = styled('div')(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&> div': {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

function ForgotPassword() {
  return (
    <Root className="flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-3xl rounded-20 overflow-hidden"
      >
        <FormSubmitEmail />
      </motion.div>
    </Root>
  );
}
export default withReducer('forgotPassword', reducer)(ForgotPassword);
