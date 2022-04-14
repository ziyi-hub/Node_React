import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/boutton.css";

const Boutton = (props) => {
  //chaque bouton à un nom et donc une redirection différente, le nom du bouton = le nom de l'url pour la redirection
  let url = "" + props.url; //permet de récupérer l'url de redirection à partir du nom du boutton
  return (
    <NavLink className="navLink-Button" to={url}>
      <button
        className={`button-default ${props.className}`}
        type="button"
        value={props.name}
      >
        <p className="text-button-component">{props.text}</p>
        {props.img && <img src={props.img} />}
      </button>
    </NavLink>
  );
};

export default Boutton;
