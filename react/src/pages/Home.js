import Footer from "../components/Footer";
import Header from "../components/Header";
import Info from "../components/Info";
import { Info2 } from "../components/Info2";
import Battle from "../assets/img/Battle.png";
import Roster from "../assets/img/Roster1.png";
import Exchange from "../assets/img/Bouton_Exchange_blanc.png";
import Packs from "../assets/img/packs.png";
import Event from "../assets/img/event3.png";
import Panel from "../components/Panel";
import { NavLink } from "react-router-dom";

const Home = () => {
  const images = [
    { img: Battle, nav: "/Battle" },
    { img: Roster, nav: "/" },
    { img: Exchange, nav: "/" },
    { img: Packs, nav: "/" },
  ];
  return (
    <div>
      <Header />
      <Info />
      <div className="section-info2">
        <div className="container">
          {images.map((element, index) => (
            <Info2 image={element.img} key={index} nav={element.nav} />
          ))}
        </div>
        <NavLink to="/Event" className="event">
          <Panel image={Event} />
        </NavLink>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
