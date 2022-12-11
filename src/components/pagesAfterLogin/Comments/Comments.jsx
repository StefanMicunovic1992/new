import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import './Comments.css'

function Comments() {

    const currentUser = useSelector((state) => state.currentUser.currentUser);
    const dataOfVideo = useSelector((state) => state.video.videoId);
    const [allComments,setAllComments] = useState()

const addComent = () =>{
    const comment = document.getElementById('comment');
    

    if(comment.value){
        const commentData = {
            comment: comment.value,
            time: Date.now(),
            username: currentUser.username,
            video: dataOfVideo[0].contentDetails.videoId
        }
        const sendComment = axios.post("http://localhost:5000/app/sendcomment", commentData)
        .then((res) => setAllComments(res.data.dataOfcomment))

        comment.value = '';
    }
}

useEffect(() => {
  if(typeof dataOfVideo == 'undefined'){
    return
  }else{
    const sendComment = axios.post("http://localhost:5000/app/getAllComents", dataOfVideo[0].contentDetails)
    .then((res) => setAllComments(res.data.dataOfcomment))
    
  }
  }, []);

const checkUser = (elem) =>{
    
    if(elem.username == currentUser.username){
        return <button className="deleteComment" data-id={elem.time}>Delete</button>
    }
}

  return (
    <div>
      <div>
        <label htmlFor="comment">Add comment</label>
        <input type="text" name="comment" id="comment" />
        <button onClick={addComent}>Add</button>
      </div>
      <div id="allComments">
        {
            allComments?.map(elem=>
                <div key={elem.time} className='oneComment'>
                  <span>{elem.username}</span>
                    <p className="textOfComment">{elem.comment}</p>
                    {checkUser(elem)}
                </div>
            )
        }
      </div>
    </div>
  );
}

export default Comments;