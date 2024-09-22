import { useDispatch, useSelector } from "react-redux";
import lan from "../utils/languageConstant";
import { useRef } from "react";
import openai from "../utils/openAi";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovies } from "../utils/GptSlice";



function GptSearchBar() {

  const dispatch = useDispatch();

  //fetch the lang from our store
  const langKey = useSelector(store => store.config.lang)

  const searchText = useRef(null);

  //search movie in TMDB Database
  async function gptSearchMovie(movie){
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
    const data = await response.json();
    return data.results
  }


  async function handleGPTSearchClick() {
    
    console.log(searchText.current.value)

    const gptQuery = "Ask as a Movie Recommendation System ans suggest some movies for the query : " + searchText.current.value + "Only Give me the name of 5 movies, comma seperated like the examply result given ahead. Example Result: Gadar, Sholay, Koi Mill Gaya, Golmal, Don";

    const gptResult = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    //Handle the error
    if(!gptResult.choices){
      console.log("Gpt result is Wrong")
    }

    console.log(gptResult.choices[0]?.message?.content)

    //it will give the array of movies  => Andaz Apna Apna, Chupke Chupke, Amar Akbar Anthony, Padosan, Jaane Bhi Do Yaaro
    const gptMovies = gptResult.choices[0]?.message?.content.split(",")

    // [Andaz Apna Apna, Chupke Chupke, Amar Akbar Anthony, Padosan, Jaane Bhi Do Yaaro]

    //for each Movie I will Search TMDB api
    const promiseArray = gptMovies.map((movie) =>  gptSearchMovie(movie)) 

    //it will give the 5 promise not result of movies [Promise, Promise, Promise, Promise, Promise]

    //Promise.all() will resolved the all Promise with one
    const tmdbMovies = await Promise.all(promiseArray)
    console.log(tmdbMovies);

    dispatch(addGptMovies({moviesName: gptMovies, moviesResult: tmdbMovies}))
    


  }

  return (
    <div className="w-[500px]  mx-auto pt-[12%]">
      <form className="flex items-center justify-center bg-gray-800 shadow-md rounded px-4 py-2 mb-4" onSubmit={(e) => e.preventDefault()}>
        <input
        ref={searchText}
          className="w-[600px] py-3 pl-2 text-lg text-gray-700 font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          type="text"
          placeholder={lan[langKey].gptSearchPlaceholder}
        />
        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out focus:outline-none focus:shadow-outline" onClick={handleGPTSearchClick}>
          {lan[langKey].search}
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar;
