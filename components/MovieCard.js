import { IMG_CDN_URL } from "../utils/constant"

function MovieCard({posterPath}){

    if(!posterPath){
        return null
    }
    
    return (
        <div className="w-[170px]">
            <img alt="Movie Card"  src={IMG_CDN_URL + posterPath}
            ></img>
        </div>
    )
}

export default MovieCard;