import React, { useReducer, useEffect ,useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/MovieListHeading";
import Movie from "./components/MovieList";
import spinner from "./assets/ajax-loader.gif";
import Search from "./components/SearchBox";
import { initialState, reducer } from "./store/reducer";
import axios from "axios";
import './App.css';
import {config } from "./config"
import MovieDetail from "./components/MovieDetail";

const MOVIE_API_URL = config.MOVIE_API_URL;

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [query, setQuery] = useState("pokemon");

    useEffect(() => {
        axios.get(MOVIE_API_URL).then(jsonResponse => {
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.data.Search
            });
        });
    }, [query]);

    const search = searchValue => {
        dispatch({
            type: "SEARCH_MOVIES_REQUEST"
        });

        axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(
            jsonResponse => {
                if (jsonResponse.data.Response === "True") {
                    dispatch({
                        type: "SEARCH_MOVIES_SUCCESS",
                        payload: jsonResponse.data.Search
                    });
                } else {
                    dispatch({
                        type: "SEARCH_MOVIES_FAILURE",
                        error: jsonResponse.data.Error
                    });
                }
            }
        );
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(search);
    };

    const { movies, errorMessage, loading } = state;

    const retrievedMovies =
        loading && !errorMessage ? (
            <img className="spinner" src={spinner} alt="Loading spinner" />
        ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
        ) : (
            movies.map((movie, index) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
        );

    return (

        <div className="App">
            <div className="m-container">
                <Header text={config.APP_NAME} />
                <div className="form" onSubmit={handleSubmit}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" caseSensitive={true} element={<div><Search search={search} />
                                <div className="movies">{retrievedMovies}</div></div>} />
                            <Route path="/s" caseSensitive={true} element={<Search />} />
                            <Route path="/movies/:imdbId" caseSensitive={true} element={<MovieDetail/>} />
                        </Routes>
                    </BrowserRouter>



                </div>
            </div>
        </div>
    );
};

export default App;