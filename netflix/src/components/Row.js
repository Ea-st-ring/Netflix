import React, { useCallback, useEffect, useState } from 'react';
import api from '../api/api';
import styled from 'styled-components';
import MovieModal from './MovieModal';
import SwiperCore, {Navigation,Pagination,Scrollbar,A11y} from 'swiper';
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';

import './Row.css';


const Row = ({title,fetchUrl,isLargeRow,id}) => {

    SwiperCore.use([Navigation]);
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
            <Swiper
            modules={[Navigation,Pagination,Scrollbar,A11y]}
            spaceBetween={30}
            slidesPerView={6}
            navigation
            pagination={{clickable:true}}
            scrollbar={{draggable:true}}
            onSwiper={(swiper)=>console.log(swiper)}
            onSlideChange={()=> console.log('slide change')}
            >
            {/* <Slider style={{height: isLargeRow ? '500px' : '170px'}}>
                <ArrowLeft onClick={()=>{onClickArrow('left')}}>
                    <span>{"<"}</span>
                </ArrowLeft> */}
            <Posters id={id}>
                {movies.map(movie => (
                    <SwiperSlide>
                    <img
                    key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}
                    onClick={()=>handleClick(movie)}

                    />
                    </SwiperSlide>
                    // TODO : 컴포넌트화하기
                ))}
            </Posters>
            {/* <ArrowRight onClick={()=>{onClickArrow('right')}}>
                <span>{">"}</span>
            </ArrowRight>

            </Slider> */}
            </Swiper>
            {modalOpen && <MovieModal
            {...movieSelected} setModalOpen={setModalOpen}
            />}

        </Section>
    );
};

const Section = styled.section`
h2{
color: white;
background-color: #000;
margin-left: 22px;
}
/* display: flex;
flex-direction: column; */
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
    /* border-radius: 5px;
    width: 250px;
    margin-right: 7px;
    transition:100ms all ease-in; */
    object-fit: contain;
    width: 100%;
    max-height: 144px;
    margin-right: 10px;
    transition: transform 450ms;
    border-radius: 4px;
}
img:hover{
    transform: scale(1.1);
}


`



export default Row;