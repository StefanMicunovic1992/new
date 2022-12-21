import "./Style/Contact.css";
import Navigation from "../Navigation/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "../../Axios-API/Axios";
import Cookies from "js-cookie";
import { setCurrentUser } from "../../store/currentUserSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


function Contact() {

  const [name,setName] = useState()
  const [surname,setSurname] = useState()
  const [email,setEmail] = useState()
  const [message,setMessage] = useState()

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
        if (res.status != 201) {
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

  const checkName = (e) => {
    e.target.value = e.target.value.replace(/[^\a-zA-Z]/g, "");
    let regExpForName = new RegExp(/^[A-Z][a-z]{1,20}$/g);
    if (regExpForName.test(e.target.value) === false) {
      e.target.nextSibling.style.visibility = "hidden";
      setName(undefined)
    } else {
      e.target.nextSibling.style.visibility = "visible";
      setName(e.target.value)
    }
  };

  const checkSurname = (e) => {
    
    let regExpForSurname = new RegExp(
      /^[A-Z][a-z]{1,15}(\s?)(([A-Z]?)([a-z]){1,15})?$/g
    );
    if (regExpForSurname.test(e.target.value) === false) {
      e.target.nextSibling.style.visibility = "hidden";
      setSurname(undefined)
    } else {
      e.target.nextSibling.style.visibility = "visible";
      setSurname(e.target.value)
    }
  };

  const checkEmail = (e) => {
    let regExpForEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g);
    if (regExpForEmail.test(e.target.value) === false) {
      e.target.nextSibling.style.visibility = "hidden";
      setEmail(undefined)
    } else {
      e.target.nextSibling.style.visibility = "visible";
      setEmail(e.target.value)
    }
  };


  const sendMessage = () =>{

    if(name !== undefined && surname !== undefined && email !== undefined && message.length > 0){
      
      const messageData = {
        name: name,
        surname: surname,
        email: email,
        message: message,
      }

      axios.post('/app/sendmessage', messageData)
                .then(res => checkResponse(res))

      const checkResponse = (response) =>{
        if(response.status==200){
          setName(undefined)
          setSurname(undefined)
          setEmail(undefined)
          setMessage(undefined)
          document.getElementById('name').value = ''
          document.getElementById('surname').value = ''
          document.getElementById('email').value = ''
          document.getElementById('message').value = ''
          const message = document.getElementById('msg')
          message.classList.remove('msgUnsuccessfullySend')
          message.classList.add('msgSuccessfullySend')
          message.innerText = 'Your message has been successfully sent'
          const allIcon = document.querySelectorAll('.icon')
          allIcon.forEach(elem=>{
            elem.style.visibility = "hidden";
          })
        }
      }
    }else{
          const message = document.getElementById('msg')
          message.classList.remove('msgSuccessfullySend')
          message.classList.add('msgUnsuccessfullySend')
          message.innerText = 'Your message has not been sent'
    }

  }

  return (
    <main id="mainDivContact">
        <Navigation></Navigation>
      <section id="contactDescription">
        <h2>Contact us</h2>
        <p>If you want to contact us with some suggestions on how to improve the work or improve it, you can do it through the contact form</p>
      </section>
      <section id="contactDiv">
        <div className="oneInput" id="nameDiv">
          <div className="labelInputIconDiv">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={(e) => checkName(e)}/>
            <FontAwesomeIcon icon={faCheck} className="icon"></FontAwesomeIcon>
          </div>
          <div id="msgForWrongName"></div>
        </div>
        <div className="oneInput" id="surnameDiv">
          <div className="labelInputIconDiv">
            <label htmlFor="surname">Surname</label>
            <input type="text" name="surname" id="surname" onChange={(e) => checkSurname(e)}/>
            <FontAwesomeIcon icon={faCheck} className="icon"></FontAwesomeIcon>
          </div>
          <div id="msgForWrongSurname"></div>
        </div>
        <div className="oneInput" id="emailDiv">
          <div className="labelInputIconDiv">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={(e) => checkEmail(e)}/>
            <FontAwesomeIcon icon={faCheck} className="icon"></FontAwesomeIcon>
          </div>
        <div id="msgForWrongEmail"></div>
        </div>
        <div className="oneInput" id="messageDiv">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" onChange={(e)=>setMessage(e.target.value)}></textarea>
        </div>
      </section>
      <section id="divForBtn">
        <p id="msg"></p>
        <button id="sendMessageBtn" onClick={sendMessage}>SEND MESSAGE</button>
      </section>
    </main>
  );
}

export default Contact;