import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Comments from "../Comments/Comments";
import Navigation from "../Navigation/Navigation";
import "./Style/PlayVideo.css";
import Cookies from "js-cookie";
import axios from "../../Axios-API/Axios";
import { setCurrentUser } from "../../store/currentUserSlice";
import { useDispatch } from "react-redux";


function PlayVideo() {
  
  const dispatch = useDispatch();
  const history = useNavigate();
  const dataOfVideo = useSelector((state) => state.video.videoId);
  const [urlOfVideo, setUrlOfVideo] = useState();

  useEffect(() => {
    const isCookie = Cookies.get("loginCookie");
    if (isCookie) {
      let cookieSend = { isCookie };
      const result = axios
        .post("/app/checkCookie", cookieSend)
        .then((res) => checkRes(res));

        async function checkRes(res) {
        console.log(res.status)
        if (res.status !== 201) {
          Cookies.remove("loginCookie");
          history("/");
        } else {
          dispatch(setCurrentUser(res.data[1]));
        }
      }
    } else {
      history("/");
    }
  }, []);

   useEffect(() => {
    if (typeof dataOfVideo == 'undefined') {
      history("/home_page");
    } else {
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
      <header><Navigation></Navigation></header>
      <section id="divForVideoAndDescription">
        <iframe src={urlOfVideo} allowFullScreen></iframe>
        <h2>{dataOfVideo?dataOfVideo[0].snippet.title:''}</h2>
        <p id="description">{dataOfVideo?dataOfVideo[0].snippet.description.substring(0,200):''}...</p>
        <button id="moreOrLessTextBtn" onClick={showDescription}>Show more</button>
      </section>
      <section>
        <Comments></Comments>
      </section>
    </main>
  )
}

export default PlayVideo;
