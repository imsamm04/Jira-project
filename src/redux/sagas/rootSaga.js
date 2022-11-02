import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
// import {theoDoiActionGetTaskApi} from './ToDoListSaga'
import * as Cyberbugs from "./Cyberbugs/UserCyberbugsSaga";
import * as ProjectCyberbugsSaga from "./Cyberbugs/ProjectCategorySaga";
import * as ProjectSaga from "./Cyberbugs/ProjectSaga";
import * as TaskTypeSaga from "./Cyberbugs/TaskTypeSaga";
import * as PrioritySaga from "./Cyberbugs/PrioritySaga";
import * as StatusSaga from "./Cyberbugs/StatusSaga";
import * as TaskSaga from "./Cyberbugs/TaskSaga";
import * as CommentSaga from "./Cyberbugs/CommentSaga";

export function* rootSaga() {
  yield all([
    //Nghiệp vụ theo dõi các action saga todolist
    ToDoListSaga.theoDoiActionGetTaskApi(),
    ToDoListSaga.theoDoiActionAddTaskApi(),
    ToDoListSaga.theoDoiActionDeleteTask(),
    ToDoListSaga.theoDoiDoneTask(),
    ToDoListSaga.theoDoiRejectTask(),

    //Nghiệp vụ cyberbugs .... ,

    Cyberbugs.theoDoiSign(),
    ProjectCyberbugsSaga.theodoigetAllProjectCategory(),

    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiRemoveUserProject(),
    ProjectSaga.theoDoiGetProjectDetail(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    PrioritySaga.theoDoiGetAllPriority(),
    StatusSaga.theoDoiGetAllStatusSaga(),
    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(),
    TaskSaga.theoDoiHandleChangePostApi(),
    CommentSaga.theoDoiGetAllComment(),
    CommentSaga.theoDoiCreateComment(),
    CommentSaga.theoDoiDeleteComment(),
  ]);
}
