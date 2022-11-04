import React from "react";
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        CyberBugs (Jira-clone)
      </NavLink>
    </nav>
  );
}
