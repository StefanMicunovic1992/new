import { useSelector } from "react-redux";
import './Style/ComponentForhHelloMesage.css'





function ComponentForhHelloMesage(){

    const currentUser = useSelector((state) => state.currentUser.currentUser);

    return(
        <section id="messageSection">
            <p id="message" className="line-1 anim-typewriter">Welcome to THE BEST PODCAST <span>{currentUser.username}</span>. Enjoy</p>
        </section>
    )
}



export default ComponentForhHelloMesage