import {  useSelector } from "react-redux";
import MovieList from "./MovieList";


function GptMovieSuggestion(){

    const {moviesName, moviesResult} = useSelector((store) => store.gpt)

    



    if(!moviesName) {
        return null
    }
    
    return (
        <div className="bg-black p-8 m-5 text-white bg-opacity-50">
            <div>
            {
                moviesName.map((movieName, index) => (<MovieList key={movieName} title={movieName} movies={moviesResult[index]} />)
            )}
            </div>
        </div>
    )
}

export default GptMovieSuggestion;