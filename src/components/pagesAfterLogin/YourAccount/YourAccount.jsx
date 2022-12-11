import './yourAccount.css'
import Navigation from "../Navigation/Navigation";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';




function YourAccount(){

    const history = useNavigate();

    const deleteCookieAndLogout = () =>{
        const getCookie = Cookies.get('loginCookie');
        console.log(getCookie)
        Cookies.remove('loginCookie')
        history('/')
    }

    return(
        <div>
            <Navigation></Navigation>
            <div>
                <button id="logoutBtn" onClick={deleteCookieAndLogout}>LOGOUT</button>
            </div>
        </div>
    )
}



export default YourAccount;