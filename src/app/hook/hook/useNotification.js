import NotificationModel from 'app/theme-layouts/shared-components/notificationPanel/model/NotificationModel';
import { addNotification } from 'app/theme-layouts/shared-components/notificationPanel/store/dataSlice';
import { useDispatch } from 'react-redux';

const useNotification = () => {
  const dispatch = useDispatch();

  function showNotification(message, variant) {
    dispatch(
      addNotification(
        NotificationModel({
          message,
          options: { variant },
        })
      )
    );
  }

  return { showNotification };
};

export default useNotification;
