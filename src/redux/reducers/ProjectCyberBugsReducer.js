const stateDefault = {
  projectList: [
    {
      id: "1",
      projectName: "Du an 1",
      description: "<p>abc</p>",
    },
  ],
};

export const ProjectCyberBugsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      state.projectList = action.projectList;
      return { ...state }; // return update new state
    }
    default:
      return { ...state };
  }
};
