import { CURRENT_USER , RETREVE_TOKEN, LOGIN, LOGOUT } from "../constants/index";

const initialState = {
  currentUse: null,
  userToken: null,
};
export const user = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };
      case RETREVE_TOKEN:
        return { 
            ...state, 
          userToken: action.Token 
      };
    case LOGIN:
      return {
        ...state,
        userToken: action.Token,
      };
    case LOGOUT:
      return {
        ...state,
        userToken: null,
      };
    default:
      return {};
  }
};
