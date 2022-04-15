import React from "react";
import "../styles/MyLVL.css";

function MyLVL() {
  return (
    <div className="container-section-my-lvl">
      <div className="container-text-img-lvl">
        <p className="text-lvl">My LVL</p>

        <div className="user-lvl-circle">
          <div className="user-lvl">2</div>
        </div>
      </div>
      <div className="container-bar-xp-value">
        <div className="container-progress-bar-lvl">
          <div className="progress-bar"></div>
        </div>
        <div className="position-xp-value">
          <p className="xp-value">2 000 / 3 000</p>
        </div>
      </div>
    </div>
  );
}

export default MyLVL;
