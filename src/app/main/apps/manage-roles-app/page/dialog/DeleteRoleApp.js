import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useNotification } from 'src/app/hook/hook';
import { closeDialog } from 'app/store/fuse/dialogSlice';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoleApp } from '../../store/manageRolesAppSlice';

export default function DeleteRoleApp() {
  const { t } = useTranslation('manageRolesApp');
  const { showNotification } = useNotification();
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeDialog());
  }
  const initData = useSelector((state) => state.manageRolesApp.manageRolesApp.targetRoleApp);
  const handleDelete = () => {
    dispatch(deleteRoleApp({ id: initData.id, showNotification, t }));
    dispatch(closeDialog());
  };

  return (
    <>
      <DialogTitle>{t('DELETE_WORKSPACE')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('YOU_WANT_TO_DELETE_THIS_ROLE_APP')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={handleDelete}>
          {t('YES')}
        </Button>
        <Button color="error" onClick={handleClose}>
          {t('CANCEL')}
        </Button>
      </DialogActions>
    </>
  );
}
