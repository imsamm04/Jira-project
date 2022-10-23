import { takeLatest } from "redux-saga/effects";
import { USER_SIGNIN_API } from "../../constants/Cyberbugs/Cyberbugs";

// quan ly action saga

function* signinSaga(action) {
  console.log("da dispatch len day", action);
}

export function* theoDoiSign() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}
