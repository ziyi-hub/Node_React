import "./styles/App.css";
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import Home from "./pages/Home";
import "./styles/Settings.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyAccount from "./pages/MyAccount";
import MyInformations from "./pages/MyInformations";
import DeleteAccount from "./pages/DeleteAccount";
import ChangePassword from "./pages/ChangePassword";
import MyStats from "./pages/MyStats";
import PackShop from "./pages/PackShop";
import ChangePictureProfil from "./pages/ChangePictureProfil";
import Battle from "./pages/Battle";
import BugReport from "./pages/BugReport";


function App() {
  return (
    <div className="background-image">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route path="/MyInformations" element={<MyInformations />} />
          <Route path="/DeleteAccount" element={<DeleteAccount />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/MyStats" element={<MyStats />} />
          <Route path="/PackShop" element={<PackShop />} />
          <Route
            path="/ChangePictureProfil"
            element={<ChangePictureProfil />}
          />
          <Route path="/Battle" element={<Battle />} />
          <Route path="/BugReport" element={<BugReport />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
