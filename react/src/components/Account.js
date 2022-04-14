import React from "react";
import "../styles/Account.css";
import "../styles/SettingsAccount.css";
import MyCoins from "./MyCoins";
import MyLVL from "./MyLVL";
import PictureNameUser from "./PictureNameUser";
import SettingsUser from "./SettingsUser";
import Boutton from "./Boutton";

function Account() {
  return (
    <div className="container-section-user-profil">
      <div className="section-user-profil">
        <div className="container-lvl-coins">
          <MyLVL />
          <MyCoins />
        </div>
        <div className="container-section-image-user">
          <Boutton
            url="/ChangePictureProfil"
            name="Change your picture profil"
            className="button-change-picture-user"
            text="Change your picture profil"
          />
          <PictureNameUser />
          <SettingsUser />
        </div>
      </div>
    </div>
  );
}

export default Account;
