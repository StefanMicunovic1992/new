import "./Style/YourAccount.css";
import Navigation from "../Navigation/Navigation";
import Cookies from "js-cookie";
import axios from "../../Axios-API/Axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/currentUserSlice";


function YourAccount() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const currentUser = useSelector((state) => state.currentUser.currentUser);

  useEffect(() => {
    const isCookie = Cookies.get("loginCookie");
    if (isCookie) {
      let cookieSend = { isCookie };
       axios.post("/app/checkCookie", cookieSend)
            .then((res) => checkRes(res));

        async function checkRes(res) {
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


  const deleteCookieAndLogout = () => {
    const getCookie = Cookies.get("loginCookie");
    Cookies.remove("loginCookie");
    history("/");
  };

  const sendNewData = () =>{

      const newUsername = document.getElementById('usernameAccountPage').value
      const newEmail = document.getElementById('emailAccountPage').value
      const newPass = document.getElementById('newPassAccountPage').value

    const newData = {
        findByUsername: currentUser.username,
        username: newUsername?newUsername:'no change',
        email: newEmail?newEmail:'no change',
        password: newPass?newPass:'no change'
    }
    
     axios.post("/app/saveChanges", newData)
          .then((res) => checkResponse(res.data));
    
    const checkResponse = (data) =>{
      if(data == 'ok'){
        deleteCookieAndLogout()
      }else{
        document.getElementById('responseMessage').innerText = data
      }
    }
  }

  const deleteAccount = () =>{
    const dataOfUser = {username:currentUser.username}
    axios.post("/app/deleteaccount", dataOfUser)
          .then((res) => checkResponse(res));

    const checkResponse = (data) =>{
      if(data.data.msg == 'succes'){
        deleteCookieAndLogout();
      }
    }
  }

  return (
    <main id="mainDivAccountPage">
      <Navigation></Navigation> 
      <section id="dataOfUser">
        <p>If you want to change some data, enter it in the corresponding field and click the save button.</p>
        <div className="inputAccountPage">
            <label htmlFor="username">Username</label>
            <input type="text" name="usernameAccountPage" id="usernameAccountPage" placeholder={currentUser.username}/>
        </div>
        <div className="inputAccountPage">
            <label htmlFor="emailAccountPage">Email</label>
            <input type="text" name="emailAccountPage" id="emailAccountPage" placeholder={currentUser.email}/>
        </div>
        <div className="inputAccountPage">
            <label htmlFor="newPassAccountPage">New password</label>
            <input type="text" name="newPassAccountPage" id="newPassAccountPage" />
        </div>
        <p id="responseMessage"></p>
        <button id="saveChanges" onClick={sendNewData}>SAVE CHANGES</button>
      </section>
      <section id="btnForLoginDelete">
        <button id="logoutBtn" onClick={deleteCookieAndLogout}>LOGOUT</button>
        <button id="deleteAccoutBtn" onClick={deleteAccount}>DELETE ACCOUNT</button>
      </section>
    </main>
  );
}

export default YourAccount;
