import { useSelector } from "react-redux";
import './ComponentForhHelloMesage.css'





function ComponentForhHelloMesage(){

    const currentUser = useSelector((state) => state.currentUser.currentUser);

    return(
        <p id="message">Welcome to TOP PODCAST dear user {currentUser.username}. Enjoy in the best podcasts</p>
    )
}



export default ComponentForhHelloMesage