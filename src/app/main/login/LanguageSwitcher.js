import { Box, Button, Typography } from '@mui/material';
import { changeLanguage } from 'app/store/i18nSlice';
import { useDispatch, useSelector } from 'react-redux';

const languages = [
  { id: 'en', title: 'English', flag: 'us' },
  { id: 'vi', title: 'Vietnamese', flag: 'vn' },
];

function LanguageSwitcher() {
  const dispatch = useDispatch();

  const currentLanguageId = useSelector(({ i18n }) => i18n.language);

  function handleLanguageChange(lng) {
    dispatch(changeLanguage(lng.id));
  }

  return (
    <Box className="self-end justify-self-end flex justify-end items-center mr-8 mb-8">
      {languages.map((language, index) => (
        <div key={language.id}>
          <Button
            className="px-0 rounded-none"
            sx={{ minWidth: '32px' }}
            onClick={() => handleLanguageChange(language)}
          >
            <Typography
              className={`${
                currentLanguageId === language.id ? 'font-bold' : 'font-normal'
              } uppercase`}
              color={(theme) => theme.palette.primary.contrastText}
            >
              {language.id}
            </Typography>
          </Button>
          {index === 0 && '|'}
        </div>
      ))}
    </Box>
  );
}

export default LanguageSwitcher;
