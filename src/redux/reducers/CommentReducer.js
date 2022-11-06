import { GET_ALL_USER_COMMENT } from "../constants/Cyberbugs/Comment";

const initialState = {
  arrComment: [],
};

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_COMMENT:
      return { ...state, arrComment: action.arrComment };

    default:
      return state;
  }
};
