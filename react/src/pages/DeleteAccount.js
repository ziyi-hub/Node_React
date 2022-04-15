import React from "react";
import { NavLink } from "react-router-dom";
import Boutton from "../components/Boutton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/DeleteAccount.css";

function DeleteAccount() {
  return (
    <div>
      <Header />
      <div className="container-delete-account-position">
        <div className="container-border-delete-informations-user">
          <h2 className="title-delete-account">
            <span className="color-title-delete">Delete</span> my account
          </h2>
          <p className="text-delete-account">
            Attention,
            <span className="color-title-delete">
              {" "}
              this action is irreversible
            </span>
            , if you delete your account, you will not be able to recover it.
          </p>
          <div className="position-button-delete">
            <Boutton
              name="no, it's a mistake"
              className="position-button-delete-account no-delete"
              text="no, it's a mistake"
            />

            <input
              className="position-button-delete-account button-format"
              type="button"
              value="yes, delete my account"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DeleteAccount;
