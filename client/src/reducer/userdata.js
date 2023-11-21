import axios from 'axios';

export const initializeUserData = () => {
  return async (dispatch) => {
    if (window.location.pathname !== "/") {
      axios.get('http://localhost:8081/user', { withCredentials: true })
        .then((response) => {
          dispatch({
            type: 'INITIALIZE_DATA',
            payload: response.data,
          });
        }).catch(error => {
          window.location.href = '/';
        })
    } else {
      dispatch({
        type: 'INITIALIZE_DATA',
        payload: null,
      });
    }
  };
};

const initialState = {
  // userData: null,
  // 다른 상태들...
};
export const changeUserData = (userData) => {
  return {
    type: 'CHANGE_DATA',
    payload: userData,
  };
};
const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    case 'CHANGE_DATA': {
      return {
        userData: action.payload
      }
    }
    default:
      return state;
  }
};

export default userDataReducer;