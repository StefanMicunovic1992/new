import Navigation from "../Navigation/Navigation";
import SideBarAllPodcast from "../SideBarAllPodcast/SideBarAllPodcast";
import SelectedPodcast from "../SelectedPodcast/SelectedPodcast";
import "./HomePage.css";
import MainDiv from "../MainDiv/MainDiv";

function HomePage() {


  return (
    <main id="mainDivHomePage">
      <div id="Navigation">
        <Navigation></Navigation>
      </div>
      <div id="SideBarAllPodcast">
        <SideBarAllPodcast></SideBarAllPodcast>
      </div>
      <div id="SelectedPodcast">
        <MainDiv></MainDiv>
      </div>
    </main>
  );
}

export default HomePage;
