import React from "react";
import "../styles/boutton.css";

const ShopButton = (props) => {
  //chaque bouton à un nom et donc une redirection différente, le nom du bouton = le nom de l'url pour la redirection
  //permet de récupérer l'url de redirection à partir du nom du boutton
  return (
    <input
      className={`button-default ${props.className}`}
      type="button"
      value={props.name}
    />
  );
};

export default ShopButton;
