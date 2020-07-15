import {
  SHOW_DASHBOARD_SUCCESS,
} from '../sagas/constants';

export const INITIAL_STATE = null;

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SHOW_DASHBOARD_SUCCESS:
      return { ...payload };
    default:
      return state;
  }
};



/*
export const updateDoc = (doc) => async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
        `https://${NAME_DB}.firebaseio.com/products/${userId}.json?auth=${token}`
        {
            method: 'PATCH',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
            });
        }
    );
};
*/