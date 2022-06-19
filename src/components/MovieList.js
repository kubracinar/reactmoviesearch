import React from "react";
import {Link} from "react-router-dom";

const DEFAULT_PLACEHOLDER_IMAGE =
    "https://m.media-amazon.com/images/M/MV5BMDkxNzRmNDYtMDY0OS00N2JhLTkzZWUtMWE3MzZkNDk1MmJiXkEyXkFqcGdeQXVyNTA3MTU2MjE@._V1_SX300.jpg";

const Movie = ({ movie }) => {
    const poster =
        movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
    return (
        <Link /*'movies/tt1201607'*/
            to={`movies/${movie.imdbID}`}
            className="text-link"
            key={movie.imdbID}
        >
        <div className="movie">
            <h2>{movie.Title}</h2>
            <div>
                <img
                    width="200"
                    alt={`The movie titled: ${movie.Title}`}
                    src={poster}
                />
            </div>
            <p>({movie.Year})</p>
            <p>({movie.imdbID})</p>

        </div> </Link>
    );
};

export default Movie;