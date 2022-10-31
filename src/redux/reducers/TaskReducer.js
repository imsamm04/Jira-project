import { GET_TASK_DETAIL } from "../constants/Cyberbugs/TaskConstants";

const initialState = {
  taskDetailModal: {
    priorityTask: {
      priorityId: 2,
      priority: "Medium",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [],
    lstComment: [],
    taskId: 6723,
    taskName: "task name demo",
    alias: "alias demo",
    description: "<p>&aacute;dsadas</p>",
    statusId: "4",
    originalEstimate: 4,
    timeTrackingSpent: 6,
    timeTrackingRemaining: 3,
    typeId: 2,
    priorityId: 3,
    projectId: 8759,
  },
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL: {
      return { ...state, taskDetailModal: action.taskDetailModal };
    }
    default:
      return state;
  }
};
