
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

function Browse(){
    

    //use use selector to fetch from GptSlice
    const GptSelector = useSelector((store) => store.gpt.GptSearchNow)

    //fetch the movies and updating the store
    useNowPlayingMovies();
    usePopularMovies();   
    useTrendingMovies();
    useUpcomingMovies();
    return (
        <div>
            <Header />
            {
                GptSelector ?  <GptSearch></GptSearch> : 
                <><MainContainer></MainContainer>
            <SecondaryContainer></SecondaryContainer></>
            }
        </div>
    )
}

export default Browse;