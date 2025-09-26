import { SET_USER, CLEAR_USER } from "../actionType";

const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
