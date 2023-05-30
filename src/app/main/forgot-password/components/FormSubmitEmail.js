import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { submitEmail } from '../store/submitEmailSlice';

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.common.white,
}));

function FormSubmitEmail() {
  const { t } = useTranslation('forgotPassword');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email(t('EMAIL_IS_NOT_VALID')).required(t('YOU_MUST_ENTER_A_EMAIL')),
  });

  const defaultValues = {
    email: '',
  };

  const { control, formState, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit(data) {
    dispatch(submitEmail({ ...data, navigate }));
  }

  return (
    <div className="flex flex-col flex-auto items-center justify-center">
      <div className="relative flex flex-col items-center justify-center w-full m-16 sm:m-32">
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
          <StyledCard className="w-full max-w-384">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              <img className="w-128 m-32" src="assets/images/logo/logo.svg" alt="logo" />

              <Typography variant="h6" className="mt-16 mb-24 font-semibold text-18 sm:text-24">
                {t('RECOVER_YOUR_PASSWORD')}
              </Typography>

              <form
                name="recoverForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label={t('EMAIL')}
                      autoFocus
                      type="email"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />

                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="Reset"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                >
                  {t('SEND_OTP_RESET_PASSWORD')}
                </Button>
              </form>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <Link className="font-normal" to="/login">
                  {t('GO_BACK_TO_LOGIN')}
                </Link>
              </div>
            </CardContent>
          </StyledCard>
        </motion.div>
      </div>
    </div>
  );
}

export default FormSubmitEmail;
