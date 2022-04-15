import React from "react";
import Panel from "./Panel";
import "../styles/info2.css";
import { NavLink } from "react-router-dom";

export const Info2 = (props) => {
  return (
    <>
      <NavLink to={props.nav} className="box">
        <Panel image={props.image} width={props.width} height={props.height} />
      </NavLink>
    </>
  );
};
