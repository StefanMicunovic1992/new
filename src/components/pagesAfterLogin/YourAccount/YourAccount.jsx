import "./yourAccount.css";
import Navigation from "../Navigation/Navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../../store/currentUserSlice";

function YourAccount() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const currentUser = useSelector((state) => state.currentUser.currentUser);

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
  }, []);


  const deleteCookieAndLogout = () => {
    const getCookie = Cookies.get("loginCookie");
    console.log(getCookie);
    Cookies.remove("loginCookie");
    history("/");
  };

  const sendNewData = () =>{

      const newFullName = document.getElementById('fullnameAccountPage').value
      const newUsername = document.getElementById('usernameAccountPage').value
      const newEmail = document.getElementById('emailAccountPage').value
      const newPass = document.getElementById('newPassAccountPage').value

    const newData = {
        findByUsername: currentUser.username,
        fullName: newFullName?newFullName:currentUser.fullName,
        username: newUsername?newFullName:currentUser.username,
        email: newEmail?newEmail:currentUser.email,
        password: newPass?newPass:undefined
    }
    console.log(newData);
    
    const result = axios.post("http://localhost:5000/app/saveChanges", newData)
                    .then((res) => console.log(res));
  }

  return (
    <div id="mainDivAccountPage">
      <Navigation></Navigation> 
      <div id="dataOfUser">
        <div className="inputAccountPage">
            <label htmlFor="fullnameAccountPage">Full name</label>
            <input type="text" name="fullnameAccountPage" id="fullnameAccountPage" placeholder={currentUser.fullName}/>
        </div>
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
        <button id="saveChanges" onClick={sendNewData}>SAVE</button>
      </div>
      <div>
        <button id="logoutBtn" onClick={deleteCookieAndLogout}>
          LOGOUT
        </button>
      </div>
    </div>
  );
}

export default YourAccount;
