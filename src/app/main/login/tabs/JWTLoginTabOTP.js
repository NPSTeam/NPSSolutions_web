/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable consistent-return */
import { yupResolver } from '@hookform/resolvers/yup';
import _ from '@lodash';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { submitOTP } from 'app/auth/store/loginSlice';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import OtpInput from 'react-otp-input';

const StyledOtpInput = styled(OtpInput)`
  .inputStyle {
    width: 3rem !important;
    height: 3rem;
    margin: 0 0.9rem;
    font-size: 2rem;

    border-bottom: 2px solid rgb(115, 141, 132);
  }
`;

const defaultValues = { otp: '' };

function JWTLoginTabOTP() {
  const { t } = useTranslation('login');
  const dispatch = useDispatch();

  const login = useSelector((state) => state.auth.login);

  const schema = yup.object().shape({
    otp: yup.string().required(t('PLEASE_ENTER_YOUR_OTP')),
  });

  const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    login.firebaseErrors.forEach((error) => {
      setError('firebaseError', {
        type: 'manual',
        message: error.message,
      });
    });
  }, [login.firebaseErrors, setError]);

  async function onSubmit(data) {
    dispatch(submitOTP({ ...data }));
  }

  return (
    <div className="w-full">
      <header>{t('OTP')}</header>
      <form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <StyledOtpInput
              {...field}
              isInputNum
              numInputs={6}
              separator={<span> </span>}
              inputStyle="inputStyle"
              shouldAutoFocus
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full mx-auto mt-16"
          aria-label="LOG IN"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          value="legacy"
        >
          {t('CONFIRM')}
        </Button>
      </form>
    </div>
  );
}
export default JWTLoginTabOTP;
