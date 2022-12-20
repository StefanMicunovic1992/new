import { useSelector } from "react-redux";
import './Style/ComponentForhHelloMesage.css'





function ComponentForhHelloMesage(){

    const currentUser = useSelector((state) => state.currentUser.currentUser);

    return(
        <section id="messageSection">
            <p id="message">Welcome to TOP PODCAST dear user {currentUser.username}. Enjoy in the best podcasts</p>
        </section>
    )
}



export default ComponentForhHelloMesage