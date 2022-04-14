import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PanelPicturesProfil from "../components/PanelPicturesProfil";

import Fishfall from "../assets/img/fishfall.png";
import Astra from "../assets/img/astra.png";
import Samy from "../assets/img/samy.png";
import Belaeu from "../assets/img/belaeu.png";
import Issa from "../assets/img/issa.png";
import Thomashd from "../assets/img/thomashd.png";
import Telen from "../assets/img/telen.png";
import Matsoe from "../assets/img/matsoe.png";
import PictureNameUser from "../components/PictureNameUser";
import SettingsUSer from "../components/SettingsUser";
import Boutton from "../components/Boutton";

const ChangePictureProfil = () => {
  const images = [
    { img: Fishfall },
    { img: Astra },
    { img: Samy },
    { img: Belaeu },
    { img: Issa },
    { img: Thomashd },
    { img: Telen },
    { img: Matsoe },
  ];

  return (
    <div>
      <Header />
      <div className="section-change-pictures-profil">
        <div className="container-border-change-picture-profil">
          <div className="mt-picture-name-user"></div>
          <div className="position-picture-user-change-pictures">
            <PictureNameUser />
          </div>
          <div className="container-images-change-pictures-profil">
            <h2 className="title-change-pictures">
              <span className="color-white-title-change-picture">
                Change my
              </span>{" "}
              picture profil
            </h2>
            <div className="container-pictures">
              {images.map((element, index) => (
                <PanelPicturesProfil image={element.img} key={index} />
              ))}
            </div>

            <div className="position-button-change-pictures">
              <Boutton name="change" text="change" />
              <Boutton
                name="upload"
                text="upload"
                className="mt-button-change-pictures"
              />
            </div>
          </div>
          <div className="container-position-settings-change-pictures">
            <div className="container-settings-change-pictures">
              <SettingsUSer />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePictureProfil;
