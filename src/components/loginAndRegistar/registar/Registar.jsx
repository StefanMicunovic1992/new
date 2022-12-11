import { useState, useEffect } from 'react';
import axios from 'axios';
import './Registar.css';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Login from '../login/Login';
import Cookies from 'js-cookie';



function Registar() {

  const [fullName, setfullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate();


  useEffect(() => {
    const isCookie = Cookies.get('loginCookie')
    if (isCookie) {
        console.log(isCookie);
        let cookieSend = { isCookie }
        const result = axios.post('http://localhost:5000/app/checkCookie', cookieSend)
            .then(res => checkRes(res))

        function checkRes(res) {
            if(res.data.msg == 'OK'){
                history('/home_page')
            }
        }
    }
});
  





  function sendRegistrationForm(e) {
    e.preventDefault()
    const registared = {
      fullName: fullName,
      username: username,
      email: email,
      password: password
    }
    const result = axios.post('http://localhost:5000/app/signup', registared)
      .then(response => check(response.data))
    function check(data) {
      if (data.status == 'error') {
        alert(data.error)
      } else {
        setfullName('');
        setUsername('')
        setEmail('')
        setPassword('')
        let allInput = document.querySelectorAll('.inputRegistar')
        allInput.forEach(elem => {
          elem.value = '';
        })
      }
    }

  }
  return (
    <section id='loginAndRegistar'>
      <form>
        <p>Create your account</p>
        <input type="text" className='inputRegistar' placeholder='enter full name' name='fullName' onChange={(e) => setfullName(e.target.value)} />
        <input type="text" className='inputRegistar' placeholder='enter username' name='username' onChange={(e) => setUsername(e.target.value)} />
        <input type="text" className='inputRegistar' placeholder='enter email' name='email' onChange={(e) => setEmail(e.target.value)} />
        <input type="text" className='inputRegistar' placeholder='enter password' name='password' onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" id='btnSubmit' value="Registar" onClick={(e) => sendRegistrationForm(e)} />
      </form>
    </section>
  );
}

export default Registar;
