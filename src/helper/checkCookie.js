import Cookies from "js-cookie";
import axios from "../Axios-API/Axios";
import { useNavigate } from "react-router-dom";

const useCookieFnc =  () => {

    const history = useNavigate();
    const isCookie = Cookies.get("loginCookie");
    if (isCookie) {
        let cookieSend = { isCookie };
        const result = axios
            .post("/app/checkCookie", cookieSend)
            .then(res =>{
                if(res.status!=201){
                    Cookies.remove("loginCookie");
                    history("/");
                }
                console.log(res.data[1])
                return res.data[1];
            });
    } else {
        history("/");
    }
}


export default useCookieFnc;