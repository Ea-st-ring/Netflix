import React, { useCallback, useEffect, useState } from 'react';
import api from '../api/api';
import styled from 'styled-components';
import MovieModal from './MovieModal';

const Row = ({title,fetchUrl,isLargeRow,id}) => {
    const [movies,setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(()=>{
        fetchMovieData();
    },[]);

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }

    const fetchMovieData = async () => {
        const request = await api.get(fetchUrl);
        setMovies(request.data.results);
        console.log(request.data.results);
    }

    const onClickArrow = ((direction) => {
        console.log(direction);
        console.log(document.getElementById(id).scrollLeft);
        if(direction==='left'){
            document.getElementById(id).scrollLeft -= window.innerWidth - 160;
        } else{
            document.getElementById(id).scrollLeft += window.innerWidth - 160;
        }
    });

    return (
        <Section>
            <h2>{title}</h2>
            <Slider style={{height: isLargeRow ? '500px' : '170px'}}>
                <ArrowLeft onClick={()=>{onClickArrow('left')}}>
                    <span>{"<"}</span>
                </ArrowLeft>
            <Posters id={id}>
                {movies.map(movie => (
                    <img
                    key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}
                    onClick={()=>handleClick(movie)}
                    />
                    // TODO : 컴포넌트화하기
                ))}
            </Posters>
            <ArrowRight onClick={()=>{onClickArrow('right')}}>
                <span>{">"}</span>
            </ArrowRight>

            </Slider>

            {modalOpen && <MovieModal
            {...movieSelected} setModalOpen={setModalOpen}
            />}

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
`


const ArrowLeft = styled.div`
width: 50px;
z-index: 100;
position: absolute;
left: 30px;
height: inherit;
display: flex;
align-items: center;
justify-content: space-around;
transition: 100ms all ease-in;
span {
color: white;
cursor: pointer;
font-size: 46px;
transition: 100ms all ease-in;
} 
&:hover{
    background-color: #0000005F;
}
span:hover{
    transform: scale(1.3);
}
`

const ArrowRight = styled.div`
width: 50px;
z-index: 100;
position: absolute;
right: 30px;
height: inherit;
display: flex;
align-items: center;
justify-content: space-around;
transition: 100ms all ease-in;
span {
color: white;
cursor: pointer;
font-size: 46px;
transition: 100ms all ease-in;
} 



&:hover{
    background-color: #0000005F;
}

span:hover{
    transform: scale(1.3);
}
`

const Posters = styled.div`
overflow-x: scroll;
overflow-y: hidden;
display: flex;
transition: 100ms all ease-in;
margin: 0px 30px 0px 30px;
&::-webkit-scrollbar {
    display: none; /* 크롬, 사파리*/
}
scroll-behavior: smooth;
img{
    border-radius: 5px;
    width: 250px;
    margin-right: 7px;
    transition:100ms all ease-in;
}
img:hover{
    transform: scale(1.1);
}


`



export default Row;