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
import { deleteItemApp } from '../../store/manageItemsAppSlice';

export default function DeleteItemApp() {
  const { t } = useTranslation('manageItemsApp');
  const { showNotification } = useNotification();
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeDialog());
  }
  const initData = useSelector((state) => state.manageItemsApp.manageItemsApp.targetItemApp);
  const handleDelete = () => {
    dispatch(deleteItemApp({ id: initData.id, showNotification, t }));
    dispatch(closeDialog());
  };

  return (
    <>
      <DialogTitle>{t('DELETE_ITEM_APP')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('YOU_WANT_TO_DELETE_THIS_ITEM_APP')}</DialogContentText>
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
