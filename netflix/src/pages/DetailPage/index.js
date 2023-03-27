import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import styled from 'styled-components';
const DetailPage = () => {
    const {movieId} = useParams();
    const [movie, setMovie] = useState({});
    useEffect(() => {
    async function fetchData(){
        const request = await api.get(
            `/movie/${movieId}`
        )
        setMovie(request.data);
    }
    fetchData();
    }, [movieId])
    
    if(!movie) return <div>...loading</div>
    return (
        <section>
            <Poster
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt='poster'
            />
        </section>
    );
};


const Poster = styled.img`
    width: 100%;
    height: auto;
    margin-bottom: 0;
`

export default DetailPage;