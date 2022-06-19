import { useMatch } from "react-router-dom";
import React,{ useEffect, useState } from "react";
import axios from "axios";
import spinner from "../assets/ajax-loader.gif";


const SpecificMovie = () => {
    // getting params
    const Params = useMatch("/movies/:imdbId")
    // getting imdb id
    const imdbId = Params.params.imdbId;

    const [isMovieLoaded, setMovieLoaded] = useState(false);
    const [isMovieAvailable, setMovieAvailable] = useState(true)


    // movie details
    const [movie, setMovie] = useState({})

    // Line component to show the line
    // to separate the sections
    const Line = function () {
        return isMovieLoaded && isMovieAvailable ?
            <div className="line-s"></div>
            :
            []
    }

    const req_movie = async () => {
        // request for movie detailshttps://www.omdbapi.com/?s=man&apikey=4a3b711b
        let req = await axios.get(`https://www.omdbapi.com/?i=${imdbId}&apikey=4a3b711b`)
        return req.data;
    }

    const get_full_plot = async () => {
        // getting full plot
        let req = await axios.get(`https://www.omdbapi.com/?i=${imdbId}&apikey=4a3b711b&plot=full`)
        return req.data;
    }

    const set_title = (title) => {
        document.title = title
    }


    const setMovieDetails = async () => {
        // scroll to top
        window.scroll(0, 0)
        try {
            // request for movie details
            let response = await req_movie()

            if (response.Response === "True") {
                // split the Movie Genre
                response.Genre = response?.Genre?.split(",")
                // converting to uppercase
                response.Type = response?.Type?.toUpperCase()

                // getting full plot
                let resp = await get_full_plot();
                response.fullPlot = resp.Plot;

                // setting movie to state
                setMovie(response)
                setMovieAvailable(true)
                setMovieLoaded(true)

                set_title(response?.Title)

            } else if (response.Response === "False") {
                // API could not find the id
                setMovieAvailable(false)

            }

        } catch (err) {

            // getting movie from database

        }
    }

    useEffect(() => {
        // setting movie details
        setMovieDetails()
    }, [])


    return (
        <div>
            {
                isMovieAvailable === true ?
                    <div className="specific-movie">
                        <div className="s-movie">
                            <div className="s-movie-poster">
                                {
                                    isMovieLoaded && movie.Poster ?
                                        movie.Poster !== "N/A" ?
                                            <img src={movie.Poster} alt="Poster" onError={() => {
                                                movie.Poster = "N/A";
                                                setMovie(movie)
                                            }} />
                                            :
                                            <div className='no-poster'>
                                                Poster<br />not<br />found
                                            </div>
                                        :
                                        <img className="spinner" src={spinner} alt="Loading spinner" />
                                }
                            </div>
                            <div className="s-movie-text">
                                <div className="s-movie-nm">
                                    {
                                        isMovieLoaded ?
                                            movie.Title
                                            :
                                            <img className="spinner" src={spinner} alt="Loading spinner" />
                                    }
                                </div>
                                <div className="s-movie-release-year">
                                    {
                                        isMovieLoaded ?
                                            movie.Type + " - "
                                            :
                                            []
                                    }
                                    {
                                        isMovieLoaded && movie.Rated !== "N/A" ?
                                            movie.Rated + " - "
                                            :
                                            []
                                    }
                                    {
                                        isMovieLoaded ?
                                            movie.Year
                                            :
                                            <img className="spinner" src={spinner} alt="Loading spinner" />
                                    }
                                </div>

                                {
                                    isMovieLoaded ?
                                        <div className="line-s"></div>
                                        :
                                        []
                                }

                                <div className="s-movie-genres">
                                    {
                                        isMovieLoaded && typeof (movie.Genre) ?
                                            movie?.Genre?.map(genre => <div className="s-movie-genre" key={genre}>{genre}</div>)
                                            :
                                            <img className="spinner" src={spinner} alt="Loading spinner" />
                                    }
                                </div>

                                <Line />

                                <div className="s-movie-plot">
                                    {
                                        isMovieLoaded ?
                                            movie.Plot !== "N/A" ?
                                                <p>{movie.Plot}</p>
                                                :
                                                []
                                            :
                                            <img className="spinner" src={spinner} alt="Loading spinner" />
                                    }
                                </div>
                            </div>

                            <Line />

                            {
                                isMovieAvailable && isMovieLoaded && movie.fullPlot !== "N/A" ?
                                    <div className="s-movie-plot table">
                                        <header className="i-header">Storyline</header>
                                        <p>{movie.fullPlot}</p>
                                        <Line />
                                    </div>
                                    :
                                    []
                            }

                            {
                                isMovieAvailable && isMovieLoaded ?
                                    <>
                                        <header className="i-header">Movie Details</header>
                                        <div className="movie-details table">
                                            <div className="table">
                                                <div className="t-row">
                                                    <div className="name">Release date</div>
                                                    <div className="val">{movie.Released}</div>
                                                </div>
                                                <div className="t-row">
                                                    <div className="name">Country</div>
                                                    <div className="val">{movie.Country}</div>
                                                </div>
                                                <div className="t-row">
                                                    <div className="name">Language</div>
                                                    <div className="val">{movie.Language}</div>
                                                </div>
                                                <div className="t-row">
                                                    <div className="name">{movie?.Type?.toUpperCase()[0]}{movie?.Type?.toLowerCase().slice(1,)} Runtime</div>
                                                    <div className="val">{movie.Runtime} </div>
                                                </div>
                                                {
                                                    movie.BoxOffice ?
                                                        <div className="t-row">
                                                            <div className="name">Box office collection</div>
                                                            <div className="val">{movie.BoxOffice}</div>
                                                        </div>
                                                        :
                                                        []
                                                }
                                            </div>
                                            <div className="table">
                                                <div className="t-row">
                                                    <div className="name">Director</div>
                                                    <div className="val">{movie.Director}</div>
                                                </div>
                                                <div className="t-row">
                                                    <div className="name">Writers</div>
                                                    <div className="val">{movie.Writer}</div>
                                                </div>
                                                <div className="t-row">
                                                    <div className="name">Stars</div>
                                                    <div className="val">{movie.Actors}</div>
                                                </div>
                                                <div className="t-row">
                                                    <div className="name">Awards</div>
                                                    <div className="val">{movie.Awards}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    :
                                    []
                            }
                            <Line />
                            {
                                isMovieAvailable && isMovieLoaded ?
                                    <>
                                        <header className="i-header">Ratings</header>
                                        <div className="table">
                                            {
                                                movie?.Ratings?.length > 0 ?
                                                    movie.Ratings.map(rating =>
                                                        <div className="t-row" key={rating.Source}>
                                                            <div className="name">{rating.Source}</div>
                                                            <div className="val">{rating.Value}</div>
                                                        </div>
                                                    )
                                                    :
                                                    <div className="t-row"><b>Movie ratings not available.</b></div>
                                            }
                                        </div>
                                    </>
                                    :
                                    []
                            }
                        </div>
                    </div>
                    :
                    <div className="movie-not-found">
                        <div className="header">
                            Movie not found!
                        </div>
                        <p>Imdb Id in URL is not associated with any movie, please check and enter correct imdb id.</p>
                    </div>
            }

        </div>
    )
}

export default SpecificMovie;