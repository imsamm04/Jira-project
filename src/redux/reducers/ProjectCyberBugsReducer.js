import { act } from "@testing-library/react";
import { GET_ALL_PROJECT } from "../constants/Cyberbugs/ProjectCyberBugsConstants";

const stateDefault = {
  projectList: [
    {
      id: "1",
      projectName: "",
      description: "",
    },
  ],
  //get all project for drop down
  arrProject: [],
};

export const ProjectCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      state.projectList = action.projectList;
      return { ...state }; // return update new state
    }
    case GET_ALL_PROJECT: {
      state.arrProject = action.arrProject;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
