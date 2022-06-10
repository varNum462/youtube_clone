import React, { useEffect } from "react";
import axios from 'axios';

const Reply = (props) => {
    async function handleSubmit (event) {
        event.preventDefault();
      let newReply = await axios.put(`http://localhost:3006/api/comments/${props.commentId}/replies`, {
            "message": event.target.reply.value           
        })
        console.log(newReply);
        props.getComments();
        document.getElementById("replyForm").reply.value="";       
    }

    useEffect(() => {
        handleSubmit();
    },[props.commentId])

    return ( 
        <div>
        <form id="replyForm" onSubmit = {handleSubmit} >
            <div>
                <label>Reply</label>
                <textarea name='reply' id='reply' className="form-control w-75 mt-2 mb-2"></textarea>
            </div>
            <div>
                <input type='submit' value='Add reply'/>
            </div>        
        </form>                
        <div className ="p-3">
            <h5>Replies</h5>
            {props.replies.map((reply) => { 
                return (
                    <div className="d-flex bg-light border border-dark text-dark mb-2">
                        <p className="p-2">{reply.message}</p>
                    </div>                         
                )}
            )}
        </div>
    </div>
     );
}
 
export default Reply;