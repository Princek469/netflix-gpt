import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { nowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constant";



function useNowPlayingMovies(){
    const dispatch = useDispatch();

    //get the movies from TMDB
    async function getMoviesList(){
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS)
        const data = await response.json();
        // console.log(data.results);
        dispatch(nowPlayingMovies(data.results))
    }

    useEffect(() => {
        getMoviesList();
    },[])   //when the component rendered initially it will called once
}


export default useNowPlayingMovies;