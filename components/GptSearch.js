import { LOGO_BACKGROUND_URL } from "../utils/constant";
import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";


function GptSearch(){
    return (
       <div>
     <div className="fixed -z-10">
        <img alt="logo" src={LOGO_BACKGROUND_URL}></img>
    </div>
        <GptSearchBar/>
        <GptMovieSuggestion/>
       </div>
    )
}

export default GptSearch;