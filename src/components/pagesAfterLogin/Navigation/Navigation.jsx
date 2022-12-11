import "./Navigation.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Navigation() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  console.log(currentUser);
  return (
    <header>
      <div id="divForLogo">
        <img
          src="/images/onlinelogomaker-121022-2102-8121.png"
          alt="TheBestPodcasts"
          id="logo"
        />
      </div>
      <nav>
        <NavLink to="/home_page">Home</NavLink>
        <NavLink to="/your_account">Your account</NavLink>
        <NavLink to="/contact">Contact us</NavLink>
        {currentUser.administrator > 0 ? (
          <NavLink to="/Administrator">Administrator</NavLink>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
}

export default Navigation;
