import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/InformationsUser.css";

function InformationsUser() {
  return (
    <div className="container-informations-user">
      <h2 className="title-informations-user">
        <span className="color-informations-user">My</span> informations
      </h2>
      <div className="mb-title"></div>
      <p className="color-text-informations-user">
        Pseudo: <span className="color-informations-user">User Unknow</span>
      </p>
      <p className="color-text-informations-user">
        My mail: <span className="color-informations-user">mail@unknow.fr</span>
      </p>
      <p className="color-text-informations-user">
        My Sponsor:{" "}
        <span className="color-informations-user">Sponsor Unknow</span>
      </p>
      <p className="color-text-informations-user">
        Registration date:{" "}
        <span className="color-informations-user">date Unknow</span>
      </p>

      <NavLink
        to="/DeleteAccount"
        className="container-informations-delete-account"
      >
        <p className="informations-delete-account">Delete my account</p>
      </NavLink>
      <div className="pb-delete-account"></div>
    </div>
  );
}

export default InformationsUser;
