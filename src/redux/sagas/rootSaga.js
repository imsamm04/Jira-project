import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
// import {theoDoiActionGetTaskApi} from './ToDoListSaga'
import * as Cyberbugs from "./Cyberbugs/UserCyberbugsSaga";
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
  ]);
}
