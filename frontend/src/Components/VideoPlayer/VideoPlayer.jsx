import React from "react";
import './VideoPlayer.css'

const VideoPlayer = (props) => {
  
    return ( 
      <div className="ratio ratio-16x9">
        <iframe allowfullscreen title="YouTube Video" src={`https://www.youtube.com/embed/${props.videoId}`} frameBorder="0"></iframe>
      </div>
    );
  };
  
export default VideoPlayer;