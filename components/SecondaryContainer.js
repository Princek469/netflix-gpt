import { useSelector } from "react-redux";
import MovieList from "./MovieList";


function SecondaryContainer(){

    const movies = useSelector((store) => store.movies)
    return (
        movies.nowPlayingMovie && 
        <div className="bg-black">
        <div className="-mt-56 relative z-20">
        <MovieList title={"Now Playing Movies"} movies={movies.nowPlayingMovie}></MovieList>
        <MovieList title={"Trending"} movies={movies.nowPlayingMovie}></MovieList>
        <MovieList title={"Popular"} movies={movies.popularMovies}></MovieList>
        <MovieList title={"Upcoming Movies"} movies={movies.upComingMovies}></MovieList>
        <MovieList title={"Horror"} movies={movies.nowPlayingMovie}></MovieList>
        </div>
    </div>
    )
}

export default SecondaryContainer;