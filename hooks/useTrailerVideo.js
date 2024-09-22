import { useDispatch, } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";

function useTrailerVideo(moviesId){
    
    const dispath = useDispatch();
    

    // const [TrailerId, setTrailerid] = useState(null);

    //fetch the trailer video and update the redux store 
    async function getMoviesTrailer(){
        const response = await fetch("https://api.themoviedb.org/3/movie/"+ moviesId +"/videos?language=en-US", API_OPTIONS)
        const data = await response.json();
        // console.log(data.results)

        const filterData = data.results.filter((video, index) => {
            return video.type === "Trailer";    //by this we got so many trailer 
        })
        const trailer = filterData.length ? filterData[0] : data.results[0]  
        // console.log(trailer);
        // setTrailerid(trailer.key);
        dispath(addTrailerVideo(trailer))
    }

    useEffect(() => {
        getMoviesTrailer();
    },[])  //it called only once when the component is rendered
}


export default useTrailerVideo;