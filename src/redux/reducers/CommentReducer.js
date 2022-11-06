import { GET_ALL_USER_COMMENT } from "../constants/Cyberbugs/Comment";

const initialState = {
  // arrComment: [],
  statusCode: 200,
  message: "Xử lý thành công!",
  content: [
    {
      user: {
        userId: 2909,
        name: "Viet",
        avatar: "https://ui-avatars.com/api/?name=Viet",
      },
      id: 6210,
      userId: 2909,
      taskId: 7028,
      contentComment: "tassk nay xong chuwa??",
      deleted: false,
      alias: "tassk-nay-xong-chuwa",
    },
  ],
  dateTime: "2022-11-06T10:44:49.2321935+07:00",
};

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_COMMENT:
      return { ...state, content: action.arrComment };

    default:
      return state;
  }
};
