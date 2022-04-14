import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PictureNameUser from "../components/PictureNameUser";
import SettingsUSer from "../components/SettingsUser";
import "../styles/Stats.css";
import Boutton from "../components/Boutton";

function MyStats() {
  return (
    <div>
      <Header />
      <div className="container-section-stats">
        <div className="container-border-stats">
          <div className="ml-stats">
            <Boutton
              url="/ChangePictureProfil"
              name="Change your picture profil"
              className="button-change-picture-user"
              text="Change your picture profil"
            />
            <PictureNameUser />
          </div>
          <div className="container-battle-wins-stats">
            <div className="container-title-stats">
              <h2 className="title-stats">
                <span className="color-title-stats">My</span> Stats
              </h2>
            </div>

            <p className="battle-wins-stats">
              Battle wins :{" "}
              <span className="value-battle-stats">{"Unknow"}</span>
            </p>
            <p className="info-battle-wins-stats">
              *Only offline battles are counted (Each time, you will earn 50
              koins and 30 XP)
            </p>
          </div>
          <div className="container-position-settings-stats">
            <div className="container-settings-stats">
              <SettingsUSer />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default MyStats;
