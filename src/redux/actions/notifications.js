
import { firestoreDB } from '../../constants/Firebase';
import moment from "moment";
export const SHOW_NOTIFICATIONS = 'SHOW_NOTIFICATIONS';
export const SAVE_DESTINATION_NOTIFICATION = 'SAVE_DESTINATION_NOTIFICATION';


const refreshNotificationsUserData = async (data, id) => {
  if (data.offerId != '') {
    const { currentCity, destinationCity } = await firestoreDB
      .collection("OffersNotificationCenter")
      .doc(data.offerId)
      .get().then((doc) => doc.data());

    if (currentCity && destinationCity) {
      return {
        ...data,
        notificationStatus: data.status,
        currentCity,
        destinationCity,
        id,
      };
    }

  } else
    return {
      ...data,
      notificationStatus: data.typeMessage,
      id,
    };
};

const refreshNotificationsConfirmationPayments = async (data, id) => {
  const { offerId, status, date } = data;


  const responseData = await firestoreDB
    .collection("OffersNotificationCenter")
    .doc(offerId)
    .get().then((doc) => doc.data());

  if (responseData) {
    return {
      ...data,
      notificationStatus: status,
      offerId,
      date,
      id,
      message: 'Tu pago se encuentra confirmado, mira el resumen de tu servicio',
    };

  } else {
    return {};
  }
};

export const showUserNotifications = (userId) => async (dispatch) => {

  const data = await firestoreDB
    .collection('NotificationsUsers')
    .where("userId", "==", userId);

  data.onSnapshot(async (notificationsUsers) => {
    const notificationsData = [];
    notificationsUsers.forEach(async (notification) => {
      const responseNotification = notification.data();
      if (
        responseNotification.userId === "0" ||
        responseNotification.userId === userId
      ) {
        if (responseNotification.offerId != '') {
          const { currentCity, destinationCity } = await firestoreDB
            .collection("OffersNotificationCenter")
            .doc(responseNotification.offerId)
            .get().then((doc) => doc.data());

          if (currentCity && destinationCity) {
            notificationsData.push({
              ...responseNotification,
              notificationStatus: responseNotification.status,
              currentCity,
              destinationCity,
              id: notification.id,
            });
          }

        } else
          notificationsData.push({
            ...responseNotification,
            notificationStatus: responseNotification.status,
            id: notification.id,
          });
      }
    });

    const dataConfirmationPayments = await firestoreDB
      .collection('ConfirmationPayments')
      .where("userId", "==", userId)
      .get().then((allNotifications) => allNotifications);

    if (dataConfirmationPayments) {
      dataConfirmationPayments.forEach(notification => {
        const { offerId, status, date } = notification.data();

        var docRef = firestoreDB.collection("OffersNotificationCenter").doc(offerId);

        docRef.get().then((doc) => {
          if (doc.exists) {
            notificationsData.push({
              ...doc.data(),
              notificationStatus: status,
              offerId,
              date,
              id: notification.id,
              message: 'Tu pago se encuentra confirmado, mira el resumen de tu servicio',
              userId,
            });

          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
      });
    }

    dispatch({
      type: SHOW_NOTIFICATIONS,
      userNotifications: notificationsData
    });
  });

  /*
  const dataConfirmationPayments = await firestoreDB
    .collection('ConfirmationPayments')
    .where("userId", "==", userId);

  dataConfirmationPayments.onSnapshot(async (confirmationPayments) => {
    const notificationsData = [];
    confirmationPayments.forEach(notification => {
      const refresh = refreshNotificationsConfirmationPayments(notification.data(), notification.id);
      if (refresh) {
        notificationsData.push(refresh);
      }
    });

    const data = await firestoreDB
      .collection('NotificationsUsers')
      .where("userId", "==", userId)
      .get().then((allNotifications) => allNotifications);

    if (data) {
      data.forEach(async (notification) => {
        const responseNotification = notification.data();
        if (
          responseNotification.userId === "0" ||
          responseNotification.userId === userId
        ) {
          if (responseNotification.offerId != '') {
            const { currentCity, destinationCity } = await firestoreDB
              .collection("OffersNotificationCenter")
              .doc(responseNotification.offerId)
              .get().then((doc) => doc.data());

            if (currentCity && destinationCity) {
              notificationsData.push({
                ...responseNotification,
                notificationStatus: responseNotification.status,
                currentCity,
                destinationCity,
                id: notification.id,
              });
            }

          } else
            notificationsData.push({
              ...responseNotification,
              notificationStatus: responseNotification.status,
              id: notification.id,
            });
        }
      });
    }

    dispatch({
      type: SHOW_NOTIFICATIONS,
      userNotifications: notificationsData
    });
  });*/
};

export const saveNotificationDestinationOffer = async ({
  offerId,
  userId,
  currentCity,
  destinationCity,
  originAddress,
  destinyAddress,
}) => {
  await firestoreDB
    .collection("NotificationsUsers")
    .add({
      date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      message: 'Has solicitado un nuevo servicio',
      typeMessage: 'Information',
      userId,
      offerId,
      currentCity,
      destinationCity,
      originAddress,
      destinyAddress,
    });
};