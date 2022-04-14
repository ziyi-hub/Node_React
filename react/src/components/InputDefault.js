import React from "react";
import "../styles/InputDefault.css";

const InputDefault = (props) => {
  //A l'appel du component : label="votre label" type="votre type" value="Votre texte" placeholder="votre placeholder"
  return (
    <div className="input-component">
      <div className="position-label-component">
        <label className="label-default">{props.label}</label>
      </div>
      <input
        className={`input-default ${props.className}`}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputDefault;
