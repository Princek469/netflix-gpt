import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { popularMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constant";



function usePopularMovies(){
    const dispatch = useDispatch();

    //get the movies from TMDB
    async function getPopularMoviesList(){
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)
        const data = await response.json();
        // console.log(data.results);
        dispatch(popularMovies(data.results))
    }

    useEffect(() => {
        getPopularMoviesList();
    },[])   //when the component rendered initially it will called once
}


export default usePopularMovies;