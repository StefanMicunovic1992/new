import "./SelectedPodcast.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../../store/currentUserSlice";
import { setVideoId } from "../../../store/videoIdSlice";
import axios from "axios";
import Cookies from "js-cookie";


function SelectedPodcast() {
  const idOfSelectedPodcast = useSelector((state) => state.onePodcast.selectedPodcast);
  console.log(idOfSelectedPodcast)
  const history = useNavigate();
  const dispatch = useDispatch();

  const [allVideoFromSelectedPodcast, setAllVideoFromSelectedPodcast] = useState();
  const [dataOfSelectedPodcast, setDataOfSelectedPodcast] = useState();
  const [playlistIdOfPodcast, setPlaylistIdOfPodcast] = useState();
  const [previousPageToken, setPreviousToken] = useState();
  const [nextPageToken, setNextPageToken] = useState();

  useEffect(() => {
    const isCookie = Cookies.get("loginCookie");
    if (isCookie) {
      let cookieSend = { isCookie };
      const result = axios
        .post("http://localhost:5000/app/checkCookie", cookieSend)
        .then((res) => checkRes(res));

      function checkRes(res) {
        if (res.data[0].msg !== "OK") {
          history("/");
        } else {
          dispatch(setCurrentUser(res.data[1]));
        }
      }
    } else {
      history("/");
    }

    fetchVideo(idOfSelectedPodcast[0][0].playListId);
    setDataOfSelectedPodcast(idOfSelectedPodcast[1][0]);
  }, [idOfSelectedPodcast]);

  const fetchVideo = async (playlistId) => {
    setPlaylistIdOfPodcast(playlistId);
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=15&playlistId=${playlistId}&key=AIzaSyC2YVRyg7s8EiUvepq6E5go2AiFQV1Mj2I`;
    const allVideoFromPlaylist = fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAllVideoFromSelectedPodcast(data.items);
        setNextPageToken(data.nextPageToken);
      })
      .catch((error) => console.log(error));
  };

  const fetchNextPage = (token) => {
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=15&pageToken=${token}&playlistId=${playlistIdOfPodcast}&key=AIzaSyC2YVRyg7s8EiUvepq6E5go2AiFQV1Mj2I`;
    const selectedPodcast = fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setNextPageToken(data.nextPageToken);
        setPreviousToken(data.prevPageToken);
        setAllVideoFromSelectedPodcast(data.items);
        console.log(data.items)
      })
      .catch((error) => console.log(error));
  };

  const playVideo = (e) => {
    console.log(e.target.dataset.id);
    console.log(allVideoFromSelectedPodcast)
    const dataOFVideo = allVideoFromSelectedPodcast.filter(elem=>elem.contentDetails.videoId == e.target.dataset.id)
    console.log(dataOFVideo);
    dispatch(setVideoId(dataOFVideo))
    history('/video')
  };

  return (
    <div id="mainDivSelectedPodcast">
      <div id="dataAboutPodcast">
        <img
          src={dataOfSelectedPodcast?.snippet.thumbnails.medium.url}
          alt={dataOfSelectedPodcast?.snippet.thumbnails.medium.url}
        />
        <h2>{dataOfSelectedPodcast?.snippet.title}</h2>
        <p>{dataOfSelectedPodcast?.snippet.description}</p>
      </div>
      <div id="currentPodcastDiv">
        <div id="divForPodcast">
          {allVideoFromSelectedPodcast?.map((element) => (
            <div
              key={element.contentDetails.videoId}
              className="oneCurrentPodcast"
            >
              <img
                src={element?.snippet.thumbnails.medium.url}
                alt={element?.snippet.thumbnails.medium.url}
              />
              <h3>{element.snippet.title}</h3>
              <button
                className="playVideoBtn"
                data-id={element.contentDetails.videoId}
                onClick={(e) => playVideo(e)}
              >
                Play
              </button>
            </div>
          ))}
        </div>
        <div id="paginationBtn">
          {previousPageToken ? (
            <button
              id="previousPage"
              onClick={() => fetchNextPage(previousPageToken)}
            >
              Previous page
            </button>
          ) : (
            ""
          )}
          {nextPageToken ? (
            <button id="nextPage" onClick={() => fetchNextPage(nextPageToken)}>
              Next page
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectedPodcast;
