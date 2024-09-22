import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

function MainContainer(){

    //extract the movies from store
    const movies = useSelector((store) => store.movies?.nowPlayingMovie)

    if(!movies) return     //if the movies is not present simply return from here

    const mainMovies = movies[3];
    console.log(mainMovies)

    const {original_title, overview, id} = mainMovies

    return (
        <div>
            <VideoTitle title={original_title} overview={overview}></VideoTitle>
            <VideoBackground moviesId={id}></VideoBackground>
        </div>
    )
}

export default MainContainer;