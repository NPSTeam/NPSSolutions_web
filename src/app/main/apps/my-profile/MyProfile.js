/* eslint-disable no-nested-ternary */
import { Avatar, Badge, Icon, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Information from './components/Information';
import reducer from './store';
import { changeAvatar, setFileContent, setFileName } from './store/informationSlice';

const BtnChangeAvatar = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

function MyProfile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const newAvatar = useRef();
  // const { showNotification } = useNotification();
  const { t } = useTranslation('myProfile');

  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);

  const submitNewAvatar = async () => {
    setSelectedFile(newAvatar.current.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(newAvatar.current.files[0]);

    const base64 = await new Promise((resolve) => {
      reader.onload = () => {
        resolve(reader.result);
      };
    });

    dispatch(setFileContent(base64));
    dispatch(setFileName(newAvatar.current.files[0].name));
    dispatch(changeAvatar());
  };

  return (
    <>
      <div className="w-full px-24 pb-48 flex flex-col md:flex-row flex-1 items-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <BtnChangeAvatar
                onClick={() => {
                  document.getElementById('newAvatar').click();
                }}
                className="w-40 h-40 -mx-12 p-0"
                size="large"
              >
                <Icon className="text-20 arrow-icon" color="inherit">
                  photo_camera
                </Icon>
              </BtnChangeAvatar>
            }
          >
            <Avatar
              sx={{
                borderWidth: 4,
                borderStyle: 'solid',
                borderColor: 'background.default',
              }}
              className="-mt-64  w-128 h-128"
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : user?.photoURL
                  ? user?.photoURL
                  : 'assets/images/avatars/profile.jpg'
              }
            />
          </Badge>
        </motion.div>
        <div className="flex flex-col md:flex-row flex-1 items-center justify-between p-8 w-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
          >
            <Typography
              className="md:px-16 text-24 md:text-32 font-semibold tracking-tight"
              variant="h4"
              color="inherit"
            >
              {user.displayName}
            </Typography>
          </motion.div>
        </div>
      </div>
      <Information />
      <input
        id="newAvatar"
        ref={newAvatar}
        onChange={submitNewAvatar}
        style={{ width: '0.001px', height: '0.001px', opacity: '0' }}
        type="file"
        accept="image/*"
      />
    </>
  );
}

export default withReducer('myProfile', reducer)(MyProfile);
