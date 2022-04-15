import React from "react";
import Boutton from "../components/Boutton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InputDefault from "../components/InputDefault";
import PictureNameUser from "../components/PictureNameUser";
import SettingsUSer from "../components/SettingsUser";
import "../styles/ChangePassword.css";

function ChangePassword() {
  return (
    <div>
      <Header />

      <div className="container-section-change-password">
        <div className="container-border-change-password">
          <div className="ml-password">
            <Boutton
              url="/ChangePictureProfil"
              name="Change your picture profil"
              className="button-change-picture-user"
              text="Change your picture profil"
            />
            <PictureNameUser />
          </div>
          <div>
            <h2 className="color-white-title-password">
              Change my
              <span className="title-change-password"> password</span>
            </h2>
            <form className="position-input-change-password">
              <InputDefault
                label="Your actual password"
                type="password"
                //                value={""}
                placeholder="Your actual password"
              />
              <InputDefault
                label="Your new password"
                type="password"
                //                value={""}
                placeholder="Your new password"
              />
              <InputDefault
                label="Confirm your new password"
                type="password"
                //                value={""}
                placeholder="Confirm your new password"
              />
              <Boutton
                name="change my password"
                className="button-change-password"
                text="change my password"
              />
            </form>
          </div>
          <div className="container-position-settings-change-password">
            <div className="container-settings-change-password">
              <SettingsUSer />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChangePassword;
