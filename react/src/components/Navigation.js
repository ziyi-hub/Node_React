import "../styles/Navigation.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navigation() {
  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <>
      <nav className={`nav-bar ${showLinks ? "show-nav" : "hide_nav"} `}>
        <div className="header-position"></div>
        <NavLink to="/Home">
          <img
            className="logo grid1"
            src="img/logo-KWKards.png"
            width="100"
            height="120"
            alt="logo"
          />
        </NavLink>
        <div className="container-nav  grid2">
          <ul className="navigation">
            <NavLink to="/Home" className="links">
              <li className="link">Accueil</li>
            </NavLink>
            <NavLink to="/Battle" className="links">
              <li className="link">Battle</li>
            </NavLink>

            <NavLink to="/MyRoster" className="links">
              <li className="link">My Roster</li>
            </NavLink>

            <NavLink to="/PackShop" className="links">
              <li className="link">Pack Shop</li>
            </NavLink>

            <NavLink to="/MyAccount" className="links container-user-mobile">
              <li className="user-mobile link">My account</li>
            </NavLink>
          </ul>
          <NavLink to="/MyAccount" className="container-user">
            <div>
              <img className="user" src="img/NoUser.png" />
              <p className="user-connexion">Sign in</p>
            </div>
          </NavLink>
        </div>

        <div className="button-pointer" onClick={handleShowLinks}>
          <button className="burger">
            <span className="burger-lign"></span>
          </button>
        </div>
      </nav>
      <div className="nav-bar-hidden"></div>
    </>
  );
}

export default Navigation;

/*
import "../styles/Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="nav-bar">
      <img
        className="logo grid1"
        src="logo-KWKards.png"
        width="100"
        height="120"
        alt="logo"
      />
      <div className="container-nav  grid2">
        <ul className="navigation">
          <NavLink
            to="/"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li className="link">Accueil</li>
          </NavLink>
          <li className="link">Battle</li>
          <li className="link">My Roster</li>
          <li className="link">Packs</li>
        </ul>
        <div className="container-user">
          <img className="user" src="img/NoUser.png" />
          <p className="user-connexion">Sign in</p>
        </div>
      </div>
    </div>
  );
}

export default Navigation;

*/
