import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ShopButton from "../components/ShopButton";
import "../styles/PackShop.css";

function PackShop() {
  return (
    <div>
      <Header />
      <h2 className="title-shop-pack">pack shop</h2>
      <div className="section-pack-shop">
        <div className="container-packs-shop">
          <div className="container-images-shop">
            <img src="img/5kards.png" />

            <p className="infos-content-shop">
              Contient<span className="color-gold-info-shop"> 5 cartes</span>
            </p>
          </div>
          <img src="img/claw-pack.png" />

          <ShopButton className="button-shop" name="2000 K" />
        </div>

        <div className="container-packs-shop">
          <div className="container-images-shop">
            <img src="img/1kard-event.png" />

            <p className="infos-content-shop">
              Contient<span className="color-green-info-shop"> 1</span> carte
              <span className="color-green-info-shop"> event</span>
            </p>
          </div>
          <img src="img/event-pack.png" />

          <ShopButton className="button-shop" name="3000 K" />
        </div>

        <div className="container-packs-shop">
          <div className="container-images-shop">
            <img src="img/4kards-1event.png" />

            <p className="infos-content-shop">
              Contient<span className="color-gold-info-shop"> 4</span>
              <span className="color-gold-info-shop"> cartes</span> +
              <span className="color-green-info-shop"> 1 </span>
              carte<span className="color-green-info-shop"> event</span>
            </p>
          </div>
          <img src="img/king-pack.png" />

          <ShopButton className="button-shop" name="5000 K" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PackShop;
