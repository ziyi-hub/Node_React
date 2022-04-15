import React from "react";
import "../styles/MyCoins.css";
import Boutton from "./Boutton";

function MyCoins() {
  return (
    <div className="container-section-my-coins">
      <div className="container-text-img-coins">
        <p className="text-coins">My coins</p>
        <div className="container-img-coins">
          <img
            className="coins-desktop"
            src="img/coins-desktop.png"
            alt="pièces-dor"
          />
          <img
            className="coins-mobile"
            src="img/coins-mobile.png"
            alt="pièces d'or"
          />
        </div>
      </div>
      <p className="coins-value">58 742</p>
      <Boutton
        url="/PackShop"
        className="pack-shop-component-coins"
        name="go to shop packs"
        text="Pack Shop"
      />
    </div>
  );
}

export default MyCoins;
