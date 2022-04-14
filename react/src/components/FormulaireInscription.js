import React from "react";
import "../styles/Formulaire.css";
import { NavLink } from "react-router-dom";
import Boutton from "./Boutton";

const FormulaireInscription = () => {
  return (
    <div className="contenu">
      <div className="container-border">
        <h1 className="title-login">inscription</h1>

        <form className="container-inputs" method="#" action="POST">
          <p className="required-form">* informations required</p>
          <input
            className="inputs-form"
            type="name"
            placeholder="  Your user name*"
            name="userName"
            required
          />
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
          <input
            className="inputs-form"
            type="password"
            placeholder="  Confirm your password*"
            name="confirmPassword"
            required
          />
          <input
            className="inputs-form"
            type="name"
            placeholder="  Have you a sponsor ? (optionnal)"
            name="sponsor"
            required
          />
        </form>
        <Boutton name="sign in" className="button-signin-login" />
        <NavLink to="/connexion">
          <div className="container-question-account">
            <p className="question-account">You have an account: </p>

            <p className="redirection-login-signin"> Login here !</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default FormulaireInscription;
