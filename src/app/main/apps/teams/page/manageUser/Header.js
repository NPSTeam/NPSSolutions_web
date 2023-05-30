import { Icon, Input, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('teams');

  return (
    <div className="flex flex-1 items-center justify-between py-8 sm:p-24">
      <div className="flex flex-1 items-center justify-center px-8 sm:px-12">
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          className="flex p-4 items-center w-full max-w-512 h-48 px-16 py-4 shadow"
        >
          <Icon color="action">search</Icon>

          <Input
            placeholder={t('SEARCH_USER')}
            className="flex flex-1 px-16"
            disableUnderline
            fullWidth
            inputProps={{
              'aria-label': 'Search',
            }}
          />
        </Paper>
      </div>
    </div>
  );
};

export default Header;
