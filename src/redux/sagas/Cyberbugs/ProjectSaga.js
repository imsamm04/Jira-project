import React from "react";
import { call, put, takeLatest, delay } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { projectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import {
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../constants/Cyberbugs/Cyberbugs";
import {
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
} from "../../constants/Cyberbugs/ProjectCyberBugsConstants";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { GET_TASKLIST_API } from "../../constants/ToDoListConst";

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

function* updateProjectSaga(action) {
  //SHOW LOADING
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      cyberbugsService.updateProject(action.projectUpdate)
    );
    if (status === STATUS_CODE.SUCCESS) {
      // yield put({
      //   type: "GET_LIST_PROJECT",
      //   projectList: data.content,
      // });
      console.log("DATA from api", data);
      yield put({
        type: "GET_LIST_PROJECT_SAGA",
      });

      yield put({
        type: "CLOSE_DRAWER",
      });
    }
  } catch (error) {
    console.log("error", error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

function* getProjectAllSaga(action) {
  //SHOW LOADING
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() => projectService.getAllProject());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT,
        arrProject: data.content,
      });
    }
  } catch (error) {
    console.log("404 not found");
    history.push("/projectmanagement");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

function* deleteProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.projectId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "Delete project successfully !");
      yield put({
        type: "GET_LIST_PROJECT_SAGA",
      });
    } else {
      notifiFunction("error", "Delete project fail !");
    }
  } catch (error) {
    notifiFunction("error", "Delete project fail !");
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

export function* theoDoiUpdateProjectSaga() {
  yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}

export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga);
}

export function* theoDoiDeleteProjectSaga() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga);
}
