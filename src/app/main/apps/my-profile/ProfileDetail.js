/* eslint-disable no-nested-ternary */
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog } from 'app/store/fuse/dialogSlice';
import MyPdf from './MyPDF';

function ProfileDetail() {
  const { t } = useTranslation('myProfile');
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const user = useSelector(({ auth }) => auth.user);

  function openPDF() {
    dispatch(
      openDialog({
        children: <MyPdf />,
        fullWidth: true,
        maxWidth: 'sm',
        height: 'auto',
        classes: {
          paper: 'rounded-8',
        },
      })
    );
  }
  const profileData = {
    partner: 'Abc',
    fullName: 'Hoang Nhat Ng',
    email: 'a@mail.com',
    phoneNumber: '0886878766',
    dateOfBirth: '09-09-1909',
    bankName: 'ACB',
    bankAccount: '0123456',
    joinDate: '09-09-1909',
    role: 'user',
    title: 'FE Dev',
    level: 'Lead',
    paymentCate: 'Hourly',
    salary: '1000$',
    defaultRate: 4,
    isSup: 'No',
  };

  const projects = ['skyeye', 'ems', 'potree'];
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // eslint-disable-next-line no-shadow
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <Grid container spacing={2} className="p-20">
        <Grid item xs={9}>
          <Paper className="rounded p-20">
            <Typography sx={{ paddingBottom: '20px', fontSize: '18px', fontWeight: 600 }}>
              {t('USER_PROFILE_DETAIL')}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>{t('PARTNER')}</Typography>
                <Typography sx={{ color: '#386FE1', fontWeight: 500 }}>
                  {profileData.partner}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('FULL_NAME')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{profileData.fullName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('EMAIL')}</Typography>
                <Typography sx={{ color: '#386FE1', fontWeight: 500 }}>
                  {profileData.email}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('PHONE_NUMBER')}</Typography>
                <Typography sx={{ color: '#386FE1', fontWeight: 500 }}>
                  {profileData.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('DATE_OF_BIRTH')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{profileData.dateOfBirth}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('BANK_NAME')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{profileData.bankName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('BANK_ACCOUNT')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{profileData.bankAccount}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider className="p-5 mr-5 ml-5" />
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('JOIN_DATE')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{profileData.joinDate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('ROLE')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{profileData.role}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('TITLE')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{profileData.title}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('LEVEL')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{profileData.level}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('IS_SUPER')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{profileData.isSup}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('PAYMENT_CATEGORY')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{profileData.paymentCate}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('CURRENT_SALARY')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{profileData.salary}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('DEFAULT_RATE')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>{profileData.defaultRate}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{t('PROJECTS')}</Typography>
                <Box sx={{ display: 'flex' }}>
                  {projects.map((proj) => (
                    <Box
                      sx={{
                        background: '#F7FAFC',
                        borderRadius: '4px',
                        marginRight: '8px',
                        padding: '8px',
                        border: 'grey',
                        borderStyle: 'solid',
                      }}
                    >
                      {proj}
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className="rounded p-20 mb-20">
            <Typography sx={{ paddingBottom: '20px', fontSize: '18px', fontWeight: 600 }}>
              {t('USER_PROFILE_PICTURE')}
            </Typography>
          </Paper>
          <Paper className="rounded p-20">
            <Typography sx={{ paddingBottom: '20px', fontSize: '18px', fontWeight: 600 }}>
              {t('CURRICULUM_VITAE')}
            </Typography>
            <Box display="flex">
              <Button onClick={openPDF}>Open</Button>
              <Button>Save</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileDetail;
