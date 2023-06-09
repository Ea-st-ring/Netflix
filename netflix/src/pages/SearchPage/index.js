import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { useDebounce } from '../../hooks/useDebounce';
import "./SearchPage.css";
const SearchPage = () => {
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    useEffect(()=>{
        if(debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }
    },[debouncedSearchTerm]);

    const fetchSearchMovie = async (searchTerm) => {
        console.log(searchTerm);
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
                            <div className='movie__column-poster'
                            onClick={()=> navigate(`/${movie.id}`)}
                            >
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
                    찾고자하는 검색어 `{debouncedSearchTerm}`에 맞는 영화가 없습니다.
                </p>
            </section>
        )
    }


    return renderSearchResults();
};

export default SearchPage;