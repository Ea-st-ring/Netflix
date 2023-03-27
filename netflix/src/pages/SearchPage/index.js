import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../api/api';
import "./SearchPage.css";
const SearchPage = () => {
    const [searchResult, setSearchResult] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get("q");

    useEffect(()=>{
        if(searchTerm) {
            fetchSearchMovie(searchTerm);
        }
    },[searchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        try{
            const request = await api.get(
                `/search/multi?query=${searchTerm}`
            )
            console.log(request.data.results);
            setSearchResult(request.data.results);
        } catch(error){
            console.log(error);
        }
    }

    const renderSearchResults = () => {
        return searchResult.length > 0 ? (
            <section className='search-container'>
            {searchResult.map((movie) => {
                if(movie.backdrop_path !== null && movie.media_type !== 'person') {
                    const movieImageUrl =
                    "https://image.tmdb.org/t/p/w500" + movie.backdrop_path
                    return(
                    <div className='movie' id={movie.id}>
                            <div className='movie__column-poster'>
                                <img
                                    src={movieImageUrl} alt='movie img'
                                    className='movie__poster'
                                />
                                <div className='movie__desc'>
                                    <p>
                                        {movie.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
            </section>
        ) : (
            <section className='no-results'>
                <div className='no-result__text'></div>
                <p>
                    찾고자하는 검색어 `{searchTerm}`에 맞는 영화가 없습니다.
                </p>
            </section>
        )
    }


    return renderSearchResults();
};

export default SearchPage;