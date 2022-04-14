import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InformationsUser from "../components/InformationsUser";
import PictureNameUser from "../components/PictureNameUser";
import SettingsUSer from "../components/SettingsUser";
import Boutton from "../components/Boutton";

function MyInformations() {
  return (
    <div>
      <Header />
      <div className="Container-my-informations">
        <div className="container-border-informations-user">
          <div className="ml-informations">
            <Boutton
              url="/ChangePictureProfil"
              name="Change your picture profil"
              className="button-change-picture-user"
              text="Change your picture profil"
            />
            <PictureNameUser />
          </div>
          <InformationsUser />
          <div className="container-position-settings-informations">
            <div className="container-settings-informations">
              <SettingsUSer />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyInformations;
