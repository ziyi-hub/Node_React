import "../style/Navigation.css";

function Navigation() {
  return (
    <div className="nav-bar">
      <img
        className="logo grid1"
        src="logo-KWKards.png"
        width="100"
        height="120"
      />
      <div className="container-nav  grid2">
        <ul className="navigation">
          <li>Accueil</li>
          <li>Battle</li>
          <li>My Roster</li>
          <li>Packs</li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
