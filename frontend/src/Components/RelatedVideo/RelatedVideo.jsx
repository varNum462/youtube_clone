import { useState, useEffect } from "react";
import axios from "axios";

const RelatedVideo = (props) => {
  const [relatedVideoList, setRelatedVideoList] = useState([]);

  const relatedVideos = async () => {
    let videoList = await axios.get (`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${props.relatedId??"VNWN1-lv4UY"}&part=snippet&type=video&key=${props.apiKey}`)
    setRelatedVideoList(videoList.data.items);
  }

  useEffect(() => {
    relatedVideos();
  },[props.relatedId])

  function handleSubmit(event){
    event.preventDefault();
    props.setVideoIdentify(event.target.relatedItem.value);    
    }
     return ( 
      <div className="p-2 mt-3 text-center border-start border-dark w-25">
      <h3 className="mt-0">Related Vids</h3>      
        {relatedVideoList.map((video) => {
          return (                
              <div className="m-2 w-100">
                <form onSubmit = {(event) => handleSubmit (event)}>
                  <input type="hidden" name="relatedItem" id="relatedItem" value={`${video.id.videoId}`} />                              
                  <input type="image" className="w-100" src={`https://img.youtube.com/vi/${video.id.videoId}/0.jpg`} alt="Submit" />
                </form>                 
              </div>
            )
          })        
        }   
      </div>
      );
 }
 
 export default RelatedVideo;