import MovieCard from "./MovieCard";

function MovieList({ title, movies }) {
   
    // Check if movies is null or empty
    if (!movies || movies.length === 0) {
        return (
            <div className="pt-5">
                <h1 className="text-3xl font-semibold">{title}</h1>
                <p className="text-gray-500 mt-3">No movies found</p>
            </div>
        );
    }

    return (
        <div className="pt-4 mt-4">
            <h1 className="text-3xl font-semibold mx-10 text-white">{title}</h1>
            <div className="flex overflow-x-scroll pt-4 gap-7 mx-5">
                {movies?.map((movie) => (
                    <div key={movie.id} className="relative cursor-pointer  mx-2">
                        <MovieCard  posterPath={movie.poster_path} />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                            <p className="text-white text-xl font-semibold">Title: {movie.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieList;
