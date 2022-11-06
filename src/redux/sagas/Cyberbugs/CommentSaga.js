import { call, delay, put, takeLatest } from "redux-saga/effects";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import {
  CREATE_USER_COMMENT,
  DELETE_USER_COMMENT,
  GET_ALL_USER_COMMENT,
  GET_ALL_USER_COMMENT_SAGA,
} from "../../constants/Cyberbugs/Comment";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

function* getAllCommentSaga(action) {
  try {
    const { data, status } = yield call(() =>
      commentService.getAllComment(action.taskId)
    );

    yield put({ type: GET_ALL_USER_COMMENT, arrComment: data.content });
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiGetAllComment(action) {
  yield takeLatest(GET_ALL_USER_COMMENT_SAGA, getAllCommentSaga);
}

function* createCommentSaga(action) {
  try {
    const { data, status } = yield call(() =>
      commentService.createUserComment(action.commentValue)
    );

    // yield put({
    //   type: GET_ALL_USER_COMMENT_SAGA,
    // });

    // if (status === STATUS_CODE.SUCCESS) {
    //   yield put({
    //     type: "GET_ALL_USER_COMMENT_SAGA",
    //   });
    // }
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiCreateComment(action) {
  yield takeLatest(CREATE_USER_COMMENT, createCommentSaga);
}

function* deleteCommentSaga(action) {
  try {
    const { status } = yield call(() =>
      commentService.deleteUserComment(action.id)
    );

    // if (status === STATUS_CODE.SUCCESS) {
    //   yield put({
    //     type: "GET_ALL_USER_COMMENT_SAGA",
    //   });
    // }
    notifiFunction("success", "Delete comment successfully !");
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiDeleteComment(action) {
  yield takeLatest(DELETE_USER_COMMENT, deleteCommentSaga);
}
