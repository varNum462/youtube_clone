import React, { useEffect } from "react";
import axios from 'axios';
import "./LikesDislikes.css"

const LikeDislike = (props) => {
  async function handleLikes(event){
    event.preventDefault();
    let newLike = await axios.put(`http://localhost:3006/api/comments/${props.commentId}/likes`)
      props.getComments();  
      console.log(`Likes: ${props.likes}`);
    }      
    useEffect(() => {
      handleLikes();
      },[props.commentId])

  async function handleDislikes(event){
    event.preventDefault();
    let newDislike = await axios.put(`http://localhost:3006/api/comments/${props.commentId}/dislikes`)
      props.getComments();
      console.log(`Dislikes: ${props.dislikes}`);
    }
    useEffect(() => {
      handleDislikes();
      },[props.commentId])
    
  return ( 
    <div className="rate_post text-end"> 
      <div className="d-flex">                 
        <div className="mr-3">
          <form onSubmit = {handleLikes} >
            <input type="hidden" value="like" name="like" id="like" />
            <button type = "submit" class="bg-success m-3 text-white">Like {props.likes}</button>
          </form>
        </div>
        <div className="ml-3">          
          <form id="likes" onSubmit = {handleDislikes} >
            <input type="hidden" value="dislike" name="dislike" id="dislike" />
            <button type = "submit" class="bg-danger m-3 text-white">Dislike {props.dislikes}</button>
          </form>    
        </div>
      </div>
    </div>   
    );
}
 
export default LikeDislike;