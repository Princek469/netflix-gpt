import { useDispatch } from "react-redux";
import { trendingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";

function useTrendingMovies(){

    const dispatch = useDispatch();
    async function getTrendingMovies(){
        const response = await fetch(`https://api.themoviedb.org/3/guest_session/{guest_session_id}/rated/tv/episodes` + API_OPTIONS)
        const data = await response.json();
        // return data.results;
        // console.log(data)
        dispatch(trendingMovies(data.results))

    }

    useEffect(() => {
        getTrendingMovies();
    },[]) //call on initially render
}

export default useTrendingMovies;