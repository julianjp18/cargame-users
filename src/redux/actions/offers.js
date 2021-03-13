import { firestoreDB } from "../../constants/Firebase";
export const CREATE_OFFER = "CREATE_OFFER";
export const SHOW_OFFER = "SHOW_OFFER";
export const CHANGE_PROFILE_PICTURE = "CHANGE_PROFILE_PICTURE";
export const ADD_DESTINATION_OFFER = "ADD_DESTINATION_OFFER";
export const OFFER_SELECTED = "OFFER_SELECTED";
export const FINAL_TOTAL_PRICE_OFFER = "FINAL_TOTAL_PRICE_OFFER";

// definicion base de datos de Ofertas.
export const createOffer = ({
  userId,
  description,
  timeZone,
  collectedDate,
  pickUpDate,
  contact,
  phone,
  currentAddress = null,
  currentCity = null,
  destinationAddress = null,
  destinationCity = null,
  driverId = null,
  pickUpAddress = null,
  status = 'ACTIVE',
  offerValue = '',
  dateOffered = '',
  typeServiceSelected,
  user,
}) => async (dispatch) => {
  const uid = [];
  await firestoreDB.collection("OffersNotificationCenter").add({
    userId,
    description,
    timeZone,
    collectedDate,
    dateOffered,
    contact,
    phone,
    currentAddress,
    currentCity,
    destinationAddress,
    destinationCity,
    driverId,
    timesOffered: 0,
    pickUpAddress,
    pickUpDate,
    status,
    offerValue,
    typeServiceSelected,
    dateStarted: '',
    user,
  }).then((ref) => uid.push(ref.id));

  if (uid[0]) {
    dispatch({
      type: CREATE_OFFER,
      userId,
      id: uid[0],
      description,
      timeZone,
      collectedDate,
      contact,
      phone,
      currentAddress,
      currentCity,
      destinationAddress,
      destinationCity,
      driverId,
      pickUpAddress,
      pickUpDate,
      status,
      typeServiceSelected,
    });
  }
};

export const addDestinationToOffer = ({
  id,
  currentCity,
  destinationCity,
  originAddress,
  destinyAddress,
}) => async (dispatch) => {
  dispatch({
    type: ADD_DESTINATION_OFFER,
    currentCity,
    destinationCity,
    currentAddress: originAddress,
    destinationAddress: destinyAddress
  });

  await firestoreDB.collection("OffersNotificationCenter").doc(id).update({
    currentCity,
    destinationCity,
    currentAddress: originAddress,
    destinationAddress: destinyAddress
  });
};

// consulta por usuario de las ofertas disponibles
export const showOffer = (userId) => async (dispatch) => {
  const data = await firestoreDB
    .collection("OffersNotificationCenter")
    .doc(userId)
    .get()
    .then((doc) => doc.data());

  dispatch({
    type: SHOW_OFFER,
    userId,
    id: data.userId,
    collectionDate: data.collectionDate,
    contact: data.contact,
    currentAddress: data.currentCity,
    currentCity: data.currentCity,
    description: data.description,
    destinationAddress: data.destinationAddress,
    destinationCity: data.destinationCity,
    driverId: data.driverId,
    phone: data.phone,
    offerValue: data.offerValue,
    pickUpAddress: data.pickUpAddress,
    pickUpDate: data.pickUpDate,
    status: data.status,
    timeZone: data.timeZone,
  });
};

export const saveOfferSelected = (offerId) => async dispatch => {
  const data = firestoreDB
    .collection("OffersNotificationCenter")
    .doc(offerId)
    .get();

  const {
    currentCity,
    destinationCity,
    timeZone,
    pickUpDate,
    offerValue,
    driverId,
    typeServiceSelected,
  } = await data.then((doc) => doc.data());

  const driverData = firestoreDB
    .collection("Drivers")
    .doc(driverId)
    .get();

  const {
    name,
    phone
  } = await driverData.then((doc) => doc.data());


  if (currentCity && destinationCity) {
    dispatch({
      type: OFFER_SELECTED,
      offerSelected: {
        currentCity,
        destinationCity,
        timeZone,
        pickUpDate,
        offerValue,
        offerId,
        driver: {
          name,
          phone,
        },
        driverId,
        typeServiceSelected,
      },
    });
  }
};

export const saveResumeOfferSelected = (offerId) => async dispatch => {
  const data = firestoreDB
    .collection("OffersNotificationCenter")
    .doc(offerId)
    .get();

  const {
    currentCity,
    destinationCity,
    timeZone,
    pickUpDate,
    offerValue,
    description,
    driverId,
    phone,
    contact,
    typeServiceSelected,
  } = await data.then((doc) => doc.data());

  const driverData = firestoreDB
    .collection("Drivers")
    .doc(driverId)
    .get();

  const driver = await driverData.then((doc) => doc.data());

  if (currentCity && destinationCity) {
    dispatch({
      type: OFFER_SELECTED,
      offerSelected: {
        currentCity,
        destinationCity,
        timeZone,
        pickUpDate,
        offerValue,
        offerId,
        description,
        phone,
        contact,
        driver: {
          name: driver.name,
          phone: driver.phone,
        },
        driverId,
        typeServiceSelected,
      },
    });
  }
};

export const saveTotalPrice = (price, offerId, driverId) => async dispatch => {
  const updateData = firestoreDB.collection('HistoryOffersNotificationCenter').doc(`${offerId}_${driverId}`).update({
    totalPrice: price,
    driverId,
  });

  dispatch({
    type: FINAL_TOTAL_PRICE_OFFER,
    finalTotalPriceOffer: price,
  });

  return await updateData.then(() => true).catch(() => false);
};

export const cancelOffer = (offerId, notificationId) => async dispatch => {

  const updateData = firestoreDB.collection('OffersNotificationCenter').doc(offerId).update({
    driverId: '',
    offerValue: '',
    dateOffered: '',
    status: 'ACTIVE',
  });

  const responseUpdateData = updateData.then(() => true).catch(() => false);

  const notificationIdData = firestoreDB.collection("NotificationsDriver").doc(notificationId).get();

  const notificationDriverId = [];
  await notificationIdData.then((doc) => notificationDriverId.push(doc.id));

  return firestoreDB.collection("NotificationsDriver")
    .doc(notificationDriverId[0])
    .delete().then(() => {
      return true;
    }).catch((error) => {
      return false;
    });
};
