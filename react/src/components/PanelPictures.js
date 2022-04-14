import React from "react";

const PanelPictures = (props) => {
  return (
    <img
      className="panel-pictures"
      src={props.image}
      height={props.height}
      width={props.width}
    />
  );
};

export default PanelPictures;
