import Navigation from "../Navigation/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import './Contact.css'




function Contact() {

    
    const checkName = (e) =>{
        e.target.value = e.target.value.replace(/[^\a-zA-Z]/g, '')
            let regExpForName = new RegExp(/^[A-Z][a-z]{1,20}$/g);
            if (regExpForName.test(e.target.value) === false) {
                e.target.nextSibling.style.visibility = 'hidden'
            } else {
                e.target.nextSibling.style.visibility = 'visible'
            }
}

const checSurname = (e) =>{
    
}


  return (
    <div id="mainDivContact">
      <div>
        <Navigation></Navigation>
      </div>
      <div id="contactDescription">
        <h2>Contact us</h2>
        <p>
          If you want to contact us with some suggestions on how to improve the
          work or improve it, you can do it through the contact form
        </p>
      </div>
      <div id="contactDiv">
        <div className="oneInput" id="nameDiv">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={(e)=>checkName(e)}/>
            <FontAwesomeIcon icon={faCheck} className="icon"></FontAwesomeIcon>
        </div>
        <div className="oneInput" id="surnameDiv">
            <label htmlFor="surname">Surname</label>
            <input type="text" name="surname" id="surname" onChange={(e)=>checSurname(e)}/>
            <FontAwesomeIcon icon={faCheck} className="icon"></FontAwesomeIcon>
        </div>
        <div className="oneInput" id="emailDiv">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email"/>
            <FontAwesomeIcon icon={faCheck} className="icon"></FontAwesomeIcon>
        </div>
        <div className="oneInput" id="messageDiv">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message"></textarea>
        </div>
      </div>
      <div id="divForBtn">
        <button id="sendMessageBtn">SEND MESSAGE</button>
      </div>
    </div>
  );
}

export default Contact;
