import { useState, useEffect } from "react";
import axios from "../../Axios-API/Axios";
import Navigation from "../Navigation/Navigation";
import "./Style/Administrator.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/currentUserSlice";
import useCookieFnc from "../../helper/checkCookie";


function Administrator() {

  const [name, setName] = useState();
  const [chanelId, setChanelId] = useState();
  const [playListId, setPlayListId] = useState();
  const [allUsers, setAllUsers] = useState();
  const [allPodcast, setAllPodcast] = useState();

  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isCookie = Cookies.get("loginCookie");
    if (isCookie) {
      let cookieSend = { isCookie };
      const result = axios
        .post("/app/checkCookie", cookieSend)
        .then((res) => checkRes(res));

        async function checkRes(res) {
        console.log(res.status)
        if (res.status != 201) {
          Cookies.remove("loginCookie");
          history("/");
        } else if(res.data[1].administrator == 0){
          history("/home_page");
        }else{
          dispatch(setCurrentUser(res.data[1]));
        }
      }
    } else {
      history("/");
    }
  }, []);

  const sendPodcastToDatabase = (e) => {
    const onePodcast = {
      name: name,
      chanelId: chanelId,
      playlistId: playListId,
    };
    const result = axios
      .post("/app/savePodcastInDatabase", onePodcast)
      .then((res) => checkStatus(res));

    const checkStatus = (res) => {
      if (res.status == 200) {
        const nameOfPodcast = (document.getElementById("nameOfPodcast").value ="");
        const chanelId = (document.getElementById("chanelId").value = "");
        const playListId = (document.getElementById("playListId").value = "");
      }
    };
  };

  const getDataFromBase = () => {
    const selectedTag = document.getElementById("getDataFromBase").value;
    
    if (selectedTag == "user") {
      const result = axios
        .get("/app/getAllUsersFromDatabase")
        .then((res) => setAllUsers(res.data));
        setAllPodcast(undefined)
    }

    if (selectedTag == "podcast") {
      console.log(selectedTag);
      const result = axios
        .get("/app/getAllPodcastFromDatabase")
        .then((res) => setAllPodcast(res.data));
        setAllUsers(undefined)
    }
  };

  const deleteUser = (e) =>{
    const idOfUser = e.target.dataset.id;
    const result = axios
        .post("/app/deleteUsers",{idOfUser})
        .then((res) => setAllUsers(res.data));
  }


  const deletePodcast = (e)=>{
    console.log(e.target)
    const idOfPodcast = e.target.dataset.id;
    const result = axios
        .post("/app/deletePodcast",{idOfPodcast})
        .then((res) => setAllPodcast(res.data));
  }

  const saveAdministratorChanges = (e) =>{
    const userId = e.target.dataset.id
    const administratorValue = e.target.parentElement.parentElement.children[1].lastChild.value
    
    const data = {
      user: userId,
      value:parseInt(administratorValue)
    }

    const result = axios.post("/app/changeAdministratorValue",data)
                        .then((res) => setAllUsers(res.data));
  }

  return (
    <main id="mainDivAdministrator">
      <div id="divForNavigation">
        <Navigation></Navigation>
      </div>
      <div id="divForInputPodcast">
        <p>Set a new podcast</p>
        <div className="oneInputAdministratorPage">
          <label htmlFor="nameOfPodcast">Name</label>
          <input type="text" id="nameOfPodcast" name="nameOfPodcast" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="oneInputAdministratorPage">
          <label htmlFor="chanelId">chanel ID</label>
          <input type="text" id="chanelId" name="chanelId" onChange={(e) => setChanelId(e.target.value)}/>
        </div>
        <div className="oneInputAdministratorPage">
          <label htmlFor="playListId">playlist ID</label>
          <input type="text" id="playListId" name="playListId" onChange={(e) => setPlayListId(e.target.value)}/>
        </div>
        <input type="submit" id="btnSubmit" value="SAVE" onClick={(e) => sendPodcastToDatabase(e)}
        />
      </div>
      <div id="divForDataFromBase">
        <p>Get the data from the database</p>
        <div id="divForSelectAndBtn">
          <select name="getDataFromBase" id="getDataFromBase">
            <option value="podcast">podcast</option>
            <option value="user">users</option>
          </select>
          <button onClick={getDataFromBase}>GET</button>
        </div>
        <div id="divForData">
          {allUsers?.map((elem) => (
            <div className="oneUser" key={elem._id}>
              <h4>Username : {elem.username}</h4>
              <div>
              <label htmlFor="administrator">Administrator:</label>
              <select name="administrator" id="administrator" defaultValue={elem.administrator==1?'1':'0'}>
                <option value="1">YES</option>
                <option value="0">NO</option>
              </select>
              </div>
              <h4>Email : {elem.email}</h4>
              <div className="buttonsOneUser">
                <button onClick={(e)=>deleteUser(e)} data-id={elem._id}>delete user</button>
                <button onClick={(e)=>saveAdministratorChanges(e)} data-id={elem._id}>save the administrator change</button>
              </div>
            </div>
          ))}
          {
            allPodcast?.map((elem)=>(
              <div className="onePodcastAdministratorPage" key={elem._id}>
                  <h4>Name : {elem.name}</h4>
                  <h4>Chanel ID : {elem.chanelId}</h4>
                  <h4>Playlist ID : {elem.playListId}</h4>
                  <button className="deletePodcastBtn" data-id={elem._id} onClick={(e)=>deletePodcast(e)}>Delete podcast</button>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}

export default Administrator;
