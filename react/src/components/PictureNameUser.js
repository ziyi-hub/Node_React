import React from "react";
import "../styles/PictureNameUser.css";
import Boutton from "./Boutton";

function PictureNameUser() {
  return (
    <div>
      <div className="container-section-image-user"></div>
      <div className="container-picture-name-user">
        <div className="picture-user">
          <img
            className="default-user-picture"
            src="default-user-picture.png"
          />
        </div>
        <p className="user-name">User Unknow</p>
      </div>
    </div>
  );
}

export default PictureNameUser;
