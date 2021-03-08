import { firestoreDB } from '../../constants/Firebase';
import moment from 'moment';

export const CREATE_USER = 'CREATE_USER';
export const SHOW_USER = 'SHOW_USER';
export const CHANGE_PHONE_NUMBER = 'CHANGE_PHONE_NUMBER';
export const CHANGE_PROFILE_PICTURE = 'CHANGE_PROFILE_PICTURE';

export const createUser = ({
  userId,
  name,
  numberId,
  phone,
  referidNumber = '',
  ipAdress,
}) => {
  return async dispatch => {
    firestoreDB
      .collection('Users')
      .doc(userId)
      .set({
        name,
        numberId,
        phone,
        referidNumber,
        profilePicture: null,
        created_at: moment().format(),
        ipAdress,
        termsAndConditions: true,
      });

    if (referidNumber != '') {
      firestoreDB
        .collection('Referrals')
        .doc()
        .set({
          identification: numberId,
          referralId: referidNumber,
          created_at: moment().format(),
        });
    }

    dispatch({
      type: CREATE_USER,
      userId,
      name: name ? name : '',
      numberId: numberId ? numberId : '',
      phone,
      referidNumber: referidNumber ? referidNumber : '',
      profilePicture: null,
    });
  };
};

export const showUser = (userId) => async dispatch => {
  if (userId) {
    const data = await firestoreDB
      .collection('Users')
      .doc(userId)
      .get().then((doc) => doc.data());
    dispatch({
      type: SHOW_USER,
      userId,
      id: userId,
      name: data.name,
      numberId: data.numberId,
      phone: data.phone,
      referidNumber: data.referidNumber,
      profilePicture: data.profilePicture,
    });
  }
};

export const changePhoneNumber = (phoneNumber, userId) => async dispatch => {
  const data = await firestoreDB
    .collection('Users')
    .doc(userId)
    .get().then((doc) => doc.data());

  const newData = {
    ...data,
    phone: phoneNumber,
  }
  const updateData = await firestoreDB.collection('Users').doc(userId).set(newData);
  dispatch({
    type: CHANGE_PHONE_NUMBER,
    userId,
    phone: phoneNumber,
  });
};

export const changeProfilePicture = (profilePicture, userId) => async dispatch => {
  const data = await firestoreDB
    .collection('Users')
    .doc(userId)
    .get().then((doc) => doc.data());

  const newData = {
    ...data,
    profilePicture,
  }

  const New = await firestoreDB.collection('Users').doc(userId).set(newData);
  dispatch({
    type: CHANGE_PROFILE_PICTURE,
    userId,
    profilePicture,
  });
};