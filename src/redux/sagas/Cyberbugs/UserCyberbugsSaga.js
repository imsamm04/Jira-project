import { put, takeLatest, delay, call } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constants/settingSystem";
import {
  USER_SIGNIN_API,
  USLOGIN,
  USER_REGISTER_API,
} from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { push } from "react-router-redux";
import { history } from "../../../util/history";
import { userService } from "../../../services/UserService";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
// import { createBrowserHistory } from "history";
// const history = createBrowserHistory();
// quan ly action saga

function* signinSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    //cach 1
    // const { data, status } = yield cyberbugsService.signinCyberBugs(
    //   action.userLogin
    // );
    //cach 2
    const { data, status } = yield call(() =>
      cyberbugsService.signinCyberBugs(action.userLogin)
    );

    //Luu vao local storage
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    history.push("/projectmanagement");
  } catch (err) {
    console.log("error", err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSign() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

function* registerUserSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  try {
    const { data, status } = yield call(() =>
      cyberbugsService.registerCyberBugs(action.userRegister)
    );

    if (status === STATUS_CODE.SUCCESS) {
      // history.push("/projectmanagement");
      notifiFunction(
        "success",
        "Account created successfully :) Thanks for being awesome!!"
      );
    }
    setTimeout(() => {
      history.push("/login");
    }, 2000);
  } catch (err) {
    console.log("error", err.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiRegisterUser() {
  yield takeLatest(USER_REGISTER_API, registerUserSaga);
}

function* getUserSaga(action) {
  //action.keyWord
  //G???i api
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );

    yield put({
      type: "GET_USER_SEARCH",
      lstUserSearch: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest("GET_USER_API", getUserSaga);
}

function* addUserProjectSaga(action) {
  //G???i api
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );

    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

function* removeUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.deleteUserFromProject(action.userProject)
    );

    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiAddUserProject() {
  yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

export function* theoDoiRemoveUserProject() {
  yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}
