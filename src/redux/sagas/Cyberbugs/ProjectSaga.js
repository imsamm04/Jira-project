import React from "react";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import {
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

function* createProjectSaga(action) {
  //SHOW LOADING

  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.createProjectAuthorization(action.newProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      // yield put({
      console.log(data);
      //   type: GET_ALL_PROJECT_CATEGORY,
      //   data: data.content,
      // });
      history.push("/projectmanagement");
    }
  } catch (error) {
    console.log("error", error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

function* getListProjectSaga(action) {
  //SHOW LOADING
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.getListProject()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_LIST_PROJECT",
        projectList: data.content,
      });
      console.log("DATA from api", data);
    }
  } catch (error) {
    console.log("error", error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga);
}

export function* theoDoiGetListProjectSaga() {
  yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga);
}
