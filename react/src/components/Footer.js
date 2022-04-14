import React from "react";
import "../styles/Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="FooterContainer">
      <ul className="liste">
        <li className="link-footer">Privacy notices</li>
        <NavLink to="/BugReport">
          <li className="link-footer">Bug report</li>
        </NavLink>
        <li className="link-footer">User data</li>
      </ul>
    </div>
  );
};

export default Footer;
