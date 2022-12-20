import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "../../Axios-API/Axios";
import './Style/Comments.css'


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
        const sendComment = axios.post("/app/sendcomment", commentData)
        .then((res) => setAllComments(res.data.dataOfcomment))

        comment.value = '';
    }
}

useEffect(() => {
  if(typeof dataOfVideo == 'undefined'){
    return
  }else{
    const sendComment = axios.post("/app/getAllComents", dataOfVideo[0].contentDetails)
    .then((res) => setAllComments(res.data.dataOfcomment))
  }
  }, []);

const deleteComment = (e) =>{

  const dataOfComment = {
    idOfComment: e.target.dataset.id,
    idOfVideo:dataOfVideo[0].contentDetails.videoId
  }

  const deleteCommentInDatabase = axios.post("/app/deleteComment", dataOfComment)
        .then((res) => setAllComments(res.data.dataOfcomment))
}


const checkUser = (elem) =>{
    if(elem.username == currentUser.username){
        return <button className="deleteComment" data-id={elem.time} onClick={(e)=>deleteComment(e)}>Delete</button>
    }
}

useEffect(() => {
  isExistingComments();
  console.log(allComments)
  }, [allComments]);

const isExistingComments = () =>{
  console.log(allComments)
  if(typeof allComments == 'undefined' || allComments.length == 0){
    return <p id="noComments">There are no comments for this video</p>
  }
}

  return (
    <section id="mainSectionComments">
      <div id="divInputComment">
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
        {isExistingComments()}
      </div>
    </section>
  );
}

export default Comments;