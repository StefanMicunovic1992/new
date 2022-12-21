import './Style/Registar.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../Axios-API/Axios";
import Cookies from 'js-cookie';
import Login from '../Login/Login';



function Registar() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate();

  useEffect(() => {
    const isCookie = Cookies.get('loginCookie')
    if (isCookie) {
        console.log(isCookie);
        let cookieSend = { isCookie }
        const result = axios.post('/app/checkCookie', cookieSend)
            .then(res => checkRes(res))
            .catch(error=>console.log(error))

        function checkRes(res) {
          console.log(res)
            if(res.data.msg == 'OK'){
                history('/home_page')
            }
        }
    }
});
  
  function sendRegistrationForm(e) {
    e.preventDefault()
    if(username && email && password){
      const registared = {
        username: username,
        email: email,
        password: password
      }
      const result = axios.post('/app/signup', registared)
        .then(response => check(response.data))
        .catch(error=>console.log(error))
      function check(data) {
        if (data.status == 'error') {
          alert(data.error)
        } else {
          setUsername('')
          setEmail('')
          setPassword('')
          let allInput = document.querySelectorAll('.inputRegistar')
          allInput.forEach(elem => {
            elem.value = '';
          })
          alert('You have successfully created an account')
          history('/')
        }
      }
    }else{
      alert('All fields must be filled in correctly')
    }
  }

  const checkPassword = (pass) =>{

    const regExpForPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passMsg = document.getElementById('passMsg')

    if(regExpForPass.test(pass)){
      console.log('sifra je jaka');
      setPassword(pass)
      passMsg.style.color = 'greenyellow';
      passMsg.innerText = 'Password is good'
    }else{
      console.log('nije jaka');
      passMsg.style.color = 'red';
      passMsg.innerText = 'Password must contain at least eight characters, one lowercase letter, one uppercase letter, one number and one symbol'
    }
  }

  const checkUsername = (username) =>{

    const usernameRegex = /^[a-zA-Z0-9]{5,20}$/
    const usernameMsg = document.getElementById('usernameMsg')
    if(usernameRegex.test(username)){
      usernameMsg.style.color = 'greenyellow';
      usernameMsg.innerText = 'Username is good'
      setUsername(username)
    }else{
      usernameMsg.style.color = 'red';
      usernameMsg.innerText = 'Username must contain at least 5 and at most 20 characters and only letters and numbers'
    }
  }

  const checkEmail = (email) =>{

    const regExpForEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g);
    const emailMsg = document.getElementById('emailMsg')
    if(regExpForEmail.test(email)){
      emailMsg.style.color = 'greenyellow';
      emailMsg.innerText = 'Email is good'
      setEmail(email)
    }else{
      emailMsg.style.color = 'red';
      emailMsg.innerText = 'Email is not good'
    }
  }
  

  return (
    <section id='registarSection'>
      <div>
      <form id='registarForm'>
        <p id='firstMsg'>Create your account</p>
        <article id='usernameArticle'>
        <input type="text" className='inputRegistar' placeholder='enter username' name='username' onChange={(e) => checkUsername(e.target.value)} />
        <p id='usernameMsg' className='regexMsg'></p>
        </article>
        <article id='emailArticle'>
        <input type="text" className='inputRegistar' placeholder='enter email' name='email' onChange={(e) => checkEmail(e.target.value)} />
        <p id='emailMsg' className='regexMsg'></p>
        </article>
        <article id='passArticle'>
        <input type="password" className='inputRegistar' placeholder='enter password' name='password' onChange={(e) => checkPassword(e.target.value)} />
        <p id='passMsg' className='regexMsg'></p>
        </article>
        <article id='submitArticle'>
        <input type="submit" id='btnSubmit' value="Registar" onClick={(e) => sendRegistrationForm(e)} />
        </article>
      </form>
      </div>
    </section>
  );
}

export default Registar;