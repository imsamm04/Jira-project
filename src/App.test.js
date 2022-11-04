import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
test("renders learn react link", () => {
  const linkElement = getByText(/learn react/i);
  const { getByText } = render(<App />);
  expect(linkElement).toBeInTheDocument();
});
