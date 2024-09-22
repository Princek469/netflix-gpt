import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { upComingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constant";



function useUpcomingMovies(){
    const dispatch = useDispatch();

    //get the movies from TMDB
    async function getUpComingMovies(){
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', API_OPTIONS)
        const data = await response.json();
        // console.log(data.results);
        dispatch(upComingMovies(data.results))
    }

    useEffect(() => {
        getUpComingMovies();
    },[])   //when the component rendered initially it will called once
}


export default useUpcomingMovies;