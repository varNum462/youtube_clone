import React, { useState, useEffect } from "react";
import axios from 'axios';
import Reply from "../Reply/Reply";
import LikeDislike from "../LikesDislikes/LikesDislikes";
import './Comment.css'

    function Comment(props) {
        const [Comment, setComment] = useState("")
        const [allComments, setAllComments] = useState ([]);
          async function handleSubmit (event) {
              event.preventDefault();
              console.log(Comment, props.videoId)
            let newComment = await axios.post(`http://localhost:3006/api/comments/`, { 
                  "message": Comment,
                  "videoId": props.videoId
              })
              console.log(newComment);
              setComment("");
              getComments();
            }
          async function getComments () {
            let response = await axios.get(`http://localhost:3006/api/comments/${props.videoId}`) ;
                console.log(response.data);
                setAllComments (response.data);
            }
        useEffect(() => {
            getComments();
        },[props.videoId])
       
        return (
            <div>
                <div>
                   <h4>{props.vidTitle}</h4>
                   <h5 data-bs-toggle="collapse" data-bs-target="#videoDescription">Description (click to read)</h5>
                   <div id="videoDescription" class="collapse">{props.vidDesc}</div>
                </div>
                <form id="commentform" onSubmit = {handleSubmit} >
                    <div>
                        <label><h5>Comment:</h5></label>
                        <textarea className="form-control w-100 mt-2 mb-2" name = 'comment' id = 'comment' value = {Comment} onChange = {(event) => setComment(event.target.value)}></textarea>
                    </div>
                    <div>
                        <input className="btn btn-info" type = 'submit' value = 'Add Comment'/>
                    </div>        
                </form>   
                <hr />             
                <div className ="w-100 mt-3">
                    <h3 className="text-center">Comments/Replies</h3>
                    {allComments.map((comment) => { 
                        return (
                            <div className="list-group-item mb-3 ml-0 w-100 p-0">
                                <div className="d-flex bg-primary text-white p-2">
                                    <h5 className="w-75">Posted {comment.dateAdded}</h5>
                                    <LikeDislike commentId = {comment._id} likes={comment.likes} dislikes={comment.dislikes} getComments = {getComments} />
                                </div>
                                <p className="msgtxt p-3">{comment.message}</p>                                
                                <Reply commentId = {comment._id} replies = {comment.replies} getComments = {getComments}/>                                
                            </div>                
                        )}
                    )}
                </div>    
            </div>  
        )
    }    
 
export default Comment; 
