import { useState, useEffect } from "react";
import axios from "../../Axios-API/Axios";
import "./Style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/currentUserSlice";



function Login() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isCookie = Cookies.get("loginCookie");
    if (isCookie) {
      let cookieSend = { isCookie };
      const result = axios
        .post("app/checkCookie", cookieSend)
        .then((res) => checkRes(res));

      function checkRes(res) {
        console.log(res.data[1].administrator);
        if (res.data[0].msg == "OK") {
          dispatch(setCurrentUser(res.data[1].administrator));
          history("/home_page");
        }
      }
    }
  });

  const sendLoginData = async (e) => {
    e.preventDefault();
    const login = {
      username: username,
      password: password,
    };
    const result = await axios
      .post("/app/findUser", login)
      .then((res) => checkResponseStatus(res));
    function checkResponseStatus(res) {
      console.log(res);
      if (res.status == 200) {
        dispatch(setCurrentUser(res.data[1].administrator));
        Cookies.set("loginCookie", `${res.data[0].accessToken}`, {
          expires: 7,
        });
        history("/home_page");
      } else {
        console.log(res.status);
        alert(res.data.msg);
      }
    }
  }

  return (
    <section id="loginSection">
      <div>
        <form id="formLogin">
          <p>Please Login</p>
          <input
            type="text"
            className="inputRegistar"
            placeholder="enter username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="inputRegistar"
            placeholder="enter password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            id="btnSubmit"
            value="Login"
            onClick={(e) => sendLoginData(e)}
          />
          <p>If you dont have account click on registar button under text</p>
          <Link to={"/register"}>Register</Link>
        </form>
      </div>
    </section>
  );
}

export default Login;
