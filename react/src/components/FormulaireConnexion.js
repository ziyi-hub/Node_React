import React from "react";
import { NavLink } from "react-router-dom";
import Boutton from "./Boutton";
import "../styles/Formulaire.css";

const FormulaireConnexion = () => {
  return (
    <div className="contenu">
      <div className="container-border">
        <h1 className="title-login">connection</h1>

        <form className="container-inputs" method="#" action="POST">
          <p className="required-form">* informations required</p>
          <input
            className="inputs-form"
            type="mail"
            placeholder="  Your mail*"
            id="mail"
            name="mail"
            required
          />
          <input
            className="inputs-form"
            type="password"
            placeholder="  Your password*"
            name="password"
            required
          />
        </form>
        <div>
          <Boutton name="login" className="button-signin-login" />
          <NavLink to="/inscription">
            <div className="container-question-account">
              <p className="question-account">I don't have an account: </p>

              <p className="redirection-login-signin"> Sign in here!</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FormulaireConnexion;
