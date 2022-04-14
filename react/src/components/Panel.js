import React from "react";

const Panel = (props) => {
  return (
    <img
      className="cart"
      src={props.image}
      height={props.height}
      width={props.width}
    />
  );
};

export default Panel;
