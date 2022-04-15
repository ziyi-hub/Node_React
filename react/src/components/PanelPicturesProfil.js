import React from "react";
import "../styles/PanelPicturesProfil.css";
import PanelPictures from "../components/PanelPictures";

const PanelPicturesProfil = (props) => {
  return (
    <>
      <div className="box-pictures">
        <PanelPictures
          image={props.image}
          width={props.width}
          height={props.height}
        />
      </div>
    </>
  );
};

export default PanelPicturesProfil;
