import React from "react";
import { NavLink } from "react-router-dom";

function SettingsUSer() {
  return (
    <div className="settings-profil">
      <NavLink to="/MyAccount">
        <p className="list-settings border-bottom">My account</p>
      </NavLink>
      <NavLink to="/MyInformations">
        <p className="list-settings border-bottom">My informations</p>
      </NavLink>
      <NavLink to="/MyStats">
        <p className="list-settings border-bottom">My stats</p>
      </NavLink>
      <NavLink to="/ChangePassword">
        <p className="list-settings border-bottom">Change my password</p>
      </NavLink>
      <NavLink to="#">
        <p className="list-settings">Sign out</p>
      </NavLink>
    </div>
  );
}

export default SettingsUSer;
