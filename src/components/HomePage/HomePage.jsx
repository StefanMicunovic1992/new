import Navigation from "../Navigation/Navigation";
import SideBarAllPodcast from "../SideBarAllPodcast/SideBarAllPodcast";
import MainDiv from "../MainDiv/MainDiv";
import "./Style/HomePage.css";

function HomePage() {


  return (
    <main id="mainDivHomePage">
      <div id="navigation">
        <Navigation></Navigation>
      </div>
      <div id="sideBar">
        <SideBarAllPodcast></SideBarAllPodcast>
      </div>
      <div id="mainDiv">
        <MainDiv></MainDiv>
      </div>
    </main>
  );
}

export default HomePage;
