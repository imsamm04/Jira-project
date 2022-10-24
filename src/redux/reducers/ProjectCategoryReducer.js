import React from "react";
import { GET_ALL_TASK_TYPE } from "../constants/Cyberbugs/TaskTypeConstants";

const stateDefault = {
  arrProjectCategory: [],
};

export const ProjectCategoryReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_TASK_TYPE:
      break;

    default:
      return { ...state };
  }
};
