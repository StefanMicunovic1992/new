import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Comments from "../Comments/Comments";
import Navigation from "../Navigation/Navigation";
import "./PlayVideo.css";


function PlayVideo() {
  const history = useNavigate();
  const dataOfVideo = useSelector((state) => state.video.videoId);
  console.log(typeof dataOfVideo);

  const [urlOfVideo, setUrlOfVideo] = useState();


   useEffect(() => {
    console.log('ulazi u useEffect');
    if (typeof dataOfVideo == 'undefined') {
      history("/home_page");
      console.log('ulazi u if')
    } else {
      console.log(dataOfVideo)
      console.log('ulazi u else')
      setUrlOfVideo(`https://www.youtube.com/embed/${dataOfVideo[0].contentDetails.videoId}`);
    }
  }, [dataOfVideo]);

  const showDescription = () =>{
    const pDescription = document.getElementById('description')
    const moreOrLessTextBtn = document.getElementById('moreOrLessTextBtn')
    console.log(moreOrLessTextBtn.innerText);
    if(moreOrLessTextBtn.innerText == 'Show more'){
      pDescription.innerText = dataOfVideo[0].snippet.description
      moreOrLessTextBtn.innerText = 'Show less'
    }else{
      pDescription.innerText = dataOfVideo[0].snippet.description.substring(0,200)+'...'
      moreOrLessTextBtn.innerText = 'Show more'
    }
  }

  return (
    <main id="mainDivPlayVideo">
      <div><Navigation></Navigation></div>
      <div id="divForVideoAndDescription">
        <iframe src={urlOfVideo} allowFullScreen></iframe>
        <h2>{dataOfVideo?dataOfVideo[0].snippet.title:''}</h2>
        <p id="description">{dataOfVideo?dataOfVideo[0].snippet.description.substring(0,200):''}...</p>
        <button id="moreOrLessTextBtn" onClick={showDescription}>Show more</button>
      </div>
      <div>
        <Comments></Comments>
      </div>
    </main>
  )
}

export default PlayVideo;
