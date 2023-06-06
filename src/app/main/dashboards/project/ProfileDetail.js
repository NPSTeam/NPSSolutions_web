/* eslint-disable no-nested-ternary */
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog } from 'app/store/fuse/dialogSlice';
import { useParams } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { getDetailUser } from './store/widgetsSlice';
import MyPdf from './MyPDF';

function ProfileDetail() {
  const { t } = useTranslation('myProfile');
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const user = useSelector(({ auth }) => auth.user);

  const { workspaceId, userId } = useParams();

  const { profileData } = useSelector(({ projectDashboardApp }) => projectDashboardApp?.widgets);

  console.log('profileData', profileData);

  useEffect(() => {
    dispatch(getDetailUser({ workspaceId, userId }));
  }, [dispatch, workspaceId, userId]);

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
  const profileDataDemo = {
    fullName: 'Hoang Nhat Ng',
    email: 'admin@mail.com',
    phoneNumber: '0762539444',
    dateOfBirth: '04-02-2001',
    bankName: 'ACB',
    bankAccount: '0123456',
    joinDate: '30-09-2021',
    role: 'user',
    title: 'FE Dev',
    level: 'Lead',
    paymentCate: 'Hourly',
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
                <Typography>Username</Typography>
                <Typography sx={{ color: '#386FE1', fontWeight: 500 }}>
                  {profileData?.dataProfile?.username}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>{t('EMAIL')}</Typography>
                <Typography sx={{ color: '#386FE1', fontWeight: 500 }}>
                  {profileData?.dataProfile?.email}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('PHONE_NUMBER')}</Typography>
                <Typography sx={{ color: '#386FE1', fontWeight: 500 }}>
                  {profileData?.dataProfile?.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{t('DATE_OF_BIRTH')}</Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {profileData?.dataProfile?.birthDay}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider className="p-5 mr-5 ml-5" />
              </Grid>

              <Divider className="w-full" />
              <Grid item xs={12}>
                <Typography>Task List</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '20rem',
                    overflowY: 'auto',
                  }}
                >
                  {profileData?.taskUserWorkspaceDtos?.map((task) => (
                    <ListItem
                      //  className={clsx(snapshot.isDragging ? 'shadow-lg' : 'shadow', 'px-40 py-12 group')}
                      sx={{ bgcolor: 'background.paper' }}
                      button
                    >
                      <div className="md:hidden absolute flex items-center justify-center inset-y-0 left-0 w-32 cursor-move md:group-hover:flex">
                        <FuseSvgIcon sx={{ color: 'text.disabled' }} size={20}>
                          heroicons-solid:menu
                        </FuseSvgIcon>
                      </div>
                      <ListItemIcon className="min-w-40 -ml-10 mr-8">
                        <IconButton
                          sx={{ color: task?.completed ? 'secondary.main' : 'text.disabled' }}
                        >
                          <FuseSvgIcon>heroicons-outline:check-circle</FuseSvgIcon>
                        </IconButton>
                      </ListItemIcon>
                      <ListItemText
                        classes={{ root: 'm-0', primary: 'truncate' }}
                        primary={task.title}
                      />
                      <div className="flex items-center">
                        <div>
                          {task.priority === 0 && (
                            <FuseSvgIcon className="text-green icon-size-16 mx-12">
                              heroicons-outline:arrow-narrow-down
                            </FuseSvgIcon>
                          )}
                          {task.priority === 2 && (
                            <FuseSvgIcon className="text-red icon-size-16 mx-12">
                              heroicons-outline:arrow-narrow-up
                            </FuseSvgIcon>
                          )}
                        </div>

                        {/* {task.dueDate && (
                         <Typography className="text-12 whitespace-nowrap" color="text.secondary">
                           {format(new Date(task.dueDate), 'LLL dd')}
                         </Typography>
                       )} */}
                      </div>
                    </ListItem>
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

            <img
              className="w-full h-full object-cover"
              src={profileData?.dataProfile?.avatar}
              alt="member"
            />
          </Paper>
          <Paper className="rounded p-20">
            <Typography sx={{ paddingBottom: '20px', fontSize: '18px', fontWeight: 600 }}>
              {t('CURRICULUM_VITAE')}
            </Typography>
            <Box display="flex">
              <Button
                onClick={openPDF}
                sx={{
                  margin: 'auto',
                }}
              >
                Open
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfileDetail;
