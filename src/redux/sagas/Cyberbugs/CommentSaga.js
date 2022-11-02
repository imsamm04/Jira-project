import { call, put, takeLatest } from "redux-saga/effects";
import { commentService } from "../../../services/CommentService";
import {
  GET_ALL_USER_COMMENT,
  GET_ALL_USER_COMMENT_SAGA,
} from "../../constants/Cyberbugs/Comment";

function* getAllCommentSaga(action) {
  try {
    const { data, status } = yield call(() =>
      commentService.getAllComment(action.taskId)
    );
    console.log("data comment1", data.content);

    yield put({ type: GET_ALL_USER_COMMENT, arrComment: data.content });
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiGetAllComment(action) {
  yield takeLatest(GET_ALL_USER_COMMENT_SAGA, getAllCommentSaga);
}
