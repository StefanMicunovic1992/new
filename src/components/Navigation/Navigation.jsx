import "./Style/Navigation.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  const toggleMobileMenu = () =>{
    const divForMobileLink = document.getElementById('divForMobileLink');
    divForMobileLink.style.display = 'flex'
  }

  const closeMobileMenu = () =>{
    const divForMobileLink = document.getElementById('divForMobileLink');
    divForMobileLink.style.display = 'none'
  }

  return (
    <>
      <header id="headerComponent">
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
      <div id="mobileMenuDiv">
      <div id="divForLogoMobileMenu">
          <img
            src="/images/onlinelogomaker-121022-2102-8121.png"
            alt="TheBestPodcasts"
            id="logo"
          />
        </div>
        <div id="moobileDivIcon">
          <FontAwesomeIcon icon={faBars} onClick={toggleMobileMenu}></FontAwesomeIcon>
        </div>
      </div>
      <div id="divForMobileLink">
        <FontAwesomeIcon icon={faXmark} id='closeMenuIcon' onClick={closeMobileMenu}></FontAwesomeIcon>
          <NavLink to="/home_page">Home</NavLink>
          <NavLink to="/your_account">Your account</NavLink>
          <NavLink to="/contact">Contact us</NavLink>
          {currentUser.administrator > 0 ? (
            <NavLink to="/Administrator">Administrator</NavLink>
          ) : (
            ""
          )}
        </div>
    </>
  );
}

export default Navigation;
