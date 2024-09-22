

//lets create the movieTrailer 
// we want the moviesId where it comes from  => it comes from my mainMovies which is inside the mainContainer

import { useSelector } from "react-redux";
import useTrailerVideo from "../hooks/useTrailerVideo";




function VideoBackground({moviesId}){

    //USE TWO THINGS DURING MOVIES ID  
    //fetch from my redux store using useSelector
    const trailerVideos = useSelector((store) => store.movies?.trailerVideo)
    useTrailerVideo(moviesId);
    
    return (
        <div className="w-screen">
            <iframe 
            className="w-screen aspect-video"
            src={"https://www.youtube.com/embed/" + trailerVideos?.key + "?&autoplay=1&mute=1" } 
            title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
            {/* it is a camel case be sure capital second word */}
        </div>
    )
}

export default VideoBackground;




