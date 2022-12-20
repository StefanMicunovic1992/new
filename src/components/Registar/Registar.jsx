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
        history('/')
      }
    }

  }
  return (
    <section id='registarSection'>
      <div>
      <form id='registarForm'>
        <p>Create your account</p>
        <input type="text" className='inputRegistar' placeholder='enter username' name='username' onChange={(e) => setUsername(e.target.value)} />
        <input type="text" className='inputRegistar' placeholder='enter email' name='email' onChange={(e) => setEmail(e.target.value)} />
        <input type="text" className='inputRegistar' placeholder='enter password' name='password' onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" id='btnSubmit' value="Registar" onClick={(e) => sendRegistrationForm(e)} />
      </form>
      </div>
    </section>
  );
}

export default Registar;