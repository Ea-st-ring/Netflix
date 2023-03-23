import React, { useCallback, useEffect, useState } from 'react';
import api from '../api/api';
import styled from 'styled-components';

const Row = ({title,fetchUrl,isLargeRow,id}) => {
    const [movies,setMovies] = useState([]);

    useEffect(()=>{
        fetchMovieData();
    },[]);

    const fetchMovieData = async () => {
        const request = await api.get(fetchUrl);
        setMovies(request.data.results);
        console.log(request.data.results);
    }

    const onClickArrow = useCallback((e,direction) => {
        if(direction==='left'){
            console.log(e.target);
        } else{
            console.log(e.target);
        }
    },[]);

    return (
        <Section>
            <h2>{title}</h2>
            <Slider>
                <ArrowLeft onClick={onClickArrow}>
                    <span>{"<"}</span>
                </ArrowLeft>
            <Posters id={id}>
                {movies.map(movie => (
                    <img
                    key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}
                    />
                    // TODO : 컴포넌트화하기
                ))}
            </Posters>
            <ArrowRight onClick={onClickArrow}>
                <span>{">"}</span>
            </ArrowRight>

            </Slider>
        </Section>
    );
};

const Section = styled.section`
h2{
color: white;
margin-left: 22px;
}
display: flex;
flex-direction: column;
background-color: #000;

`

const Slider = styled.div`
display: flex;
align-items: center;
overflow-x: scroll;
&::-webkit-scrollbar {
    display: none; /* 크롬, 사파리*/
}

`


const ArrowLeft = styled.div`
position: sticky;
left: 30px;
span {
color: white;
cursor: pointer;
font-size: 36px;
}
`

const ArrowRight = styled.div`
position: sticky;
right: 30px;
span{
color: white;
font-size: 36px;
cursor: pointer;
}
`

const Posters = styled.div`

display: flex;


img{
    width: 250px;
    
}

`



export default Row;