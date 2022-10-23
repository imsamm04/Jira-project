import { put, takeLatest, delay, call } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";
import { USER_SIGNIN_API } from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { push } from "react-router-redux";
import { history } from "../../../util/history";
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
    console.log("data", data);
    //Luu vao local storage
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
    console.log("push", push);
    // action.userLogin.history.push("/home");
    history.push("/home");
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
