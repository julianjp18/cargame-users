// Fecha  : Ultima revision Agosto 19 - 2020
// Autor  : Flavio Cortes
// Detalle: Definicion de la collecion de Ofertas - OffersNotificationCenter

import { firestoreDB } from "../../constants/Firebase";
export const CREATE_OFFER = "CREATE_OFFER";
export const SHOW_OFFER = "SHOW_OFFER";
export const CHANGE_PROFILE_PICTURE = "CHANGE_PROFILE_PICTURE";

// definicion base de datos de Ofertas.
export const createOffer = ({
  userId,
  collectedDate,
  contact,
  currentAddress,
  currentCity,
  description,
  destinationAddress,
  destinationCity,
  driverId,
  Movil,
  pickUpDate,
  pickUpAddress,
  status,
  timeZone,
}) => {
  return async (dispatch) => {
    firestoreDB.collection("OffersNotificationCenter").doc().set({
      collectedDate,
      contact,
      currentAddress,
      currentCity,
      description,
      destinationAddress,
      destinationCity,
      driverId,
      Movil,
      pickUpAddress,
      pickUpDate,
      status,
      timeZone,
      userId,
    });
    dispatch({
      type: CREATE_OFFER,
      userId,
      id: userId,
      collectedDate,
      contact,
      currentAddress,
      currentCity,
      description,
      destinationAddress,
      destinationCity,
      driverId,
      Movil,
      pickUpAddress,
      pickUpDate,
      status,
      timeZone,
    });
  };
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
    pickupDate: data.pickupDate,
    collectionDate: data.collectionDate,
    contact: data.contact,
    currentAddress: data.currentCity,
    currentCity: data.currentCity,
    description: data.description,
    destinationAddress: data.destinationAddress,
    destinationCity: data.destinationCity,
    driverId: data.driverId,
    Movil: data.Movil,
    pickUpAddress: data.pickUpAddress,
    pickUpDate: data.pickUpDate,
    status: data.status,
    timeZone: data.timeZone,
  });
};