import { firestoreDB } from '../../constants/Firebase';
import moment from "moment";
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';
export const SAVE_DESTINATION_NOTIFICATION = 'SAVE_DESTINATION_NOTIFICATION';

export const showUserNotifications = (userId) => async dispatch => {

  const data = await firestoreDB
      .collection('NotificationsUsers')
      .get().then((allNotifications) => allNotifications);

  const notificationsData = [];
  if (data) {
    data.forEach(notification => {
      if (
        notification.data().userId === "0" ||
        notification.data().userId === userId
      ) {
        notificationsData.push({...notification.data()});
      }
    });
  }

  dispatch({
    type: SHOW_NOTIFICATIONS,
    userNotifications: notificationsData
  });
};

export const saveNotificationDestinationOffer = async ({ offerId, userId }) => {
  await firestoreDB
    .collection("NotificationsUsers")
    .add({
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      message: 'Has solicitado un nuevo servicio',
      typeMessage: 'Information',
      userId,
      offerId,
    });
};