import React from "react";

const initialState = {
  visible: false,
  ComponentContentDrawer: <p>Default Content</p>,
};

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_DRAWER":
      return { ...state, visible: true };
    case "CLOSE_DRAWER":
      return { ...state, visible: false };

    default:
      return state;
  }
};
