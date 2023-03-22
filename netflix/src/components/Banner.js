import React from 'react';
import api from '../api/api';
import requests from '../api/requests';
import { useEffect, useState } from 'react';
import styled from 'styled-components';



const Banner = () => {
    
    const [movie,setMovie] = useState([]);
    const [isClicked,setIsClicked]=useState();
    const iframe = document.createElement('iframe');
    iframe.setAttribute('allow', 'fullscreen'); // must be 1st
    iframe.setAttribute('allowFullScreen', '');
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async () => {
        const request = await api.get(requests.fetchNowPlaying);
        console.log(request);
        const movieId =
        request.data.results[
            Math.floor(Math.random()* request.data.results.length)
        ].id;
        
        const {data: movieDetail} = await api.get(`movie/${movieId}`, {
            params:{ append_to_response:"videos"},
        });
        setMovie(movieDetail);
    };

    const truncate = (str) => {
        return str?.length > 100 ? str.substr(0, 99) + "..." : str;
    };

    if(!isClicked){
        return (
            <Header style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`}}>
                <Contents>
                <Title>{movie.title || movie.name || movie.original_name}</Title>
                <Buttons>
                    <PlayBtn
                    onClick={()=> {movie.videos.results[0].key ? setIsClicked(true) : setIsClicked(false)}}
                    >Play</PlayBtn>
                    <InfoBtn>More Information</InfoBtn>
                </Buttons>
                <Description>{truncate(movie.overview)}</Description>
                </Contents>
                <FadeBottom/>
            </Header>
            );
    }
    else {
        return(
            <Container>
                <HomeContainer>
                    <IFrame
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                    width="640"
                    height='360'
                    frameBorder="0"
                    allow='autoplay; fullscreen'
                    allowFullScreen
                    >
                    </IFrame>
                </HomeContainer>
            </Container>
        )
    }
    
    
};

export default Banner;

const IFrame = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.95;
    border: none;

    &::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
`

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`

const Header = styled.header`
background-position: top center;
background-size: cover;
color: white;
object-fit: contain;
height: 448px;
@media ${(props) => props.theme.desktop} {
    position: relative;
    height: 600px;
}
`
const Title = styled.h1`
font-size: 3rem;
font-weight: 800;
padding-bottom: 0.5rem;
min-width: 100%;
`

const Contents = styled.div`
margin-left: 40px;
padding-top: 140px;
height: 190px;
min-width: 100%;
@media ${(props) => props.theme.mobile} {
    width: min-content !important;
    padding-left: 2.3rem;
    margin-left: 0px !important;
}
`

const Buttons = styled.div`
@media ${(props) => props.theme.mobile} {
    font-size: 0.8rem !important;
    border-radius: 4px !important;
}
display: flex;
`

const PlayBtn = styled.button`
@media ${(props) => props.theme.mobile} {
    font-size: 1rem !important;
    border-radius: 4px !important;
}
background-color: white;
color: black;
display: flex;
flex-direction: row;
justify-content: start;
align-items: start;
cursor: pointer;
outline: none;
border: none;
font-size: 1rem;
font-weight: 700;
border-radius: 0.2vw;
padding: 0.6rem 2.0rem 0.6rem 1.2rem;
margin-right: 1rem;
&:hover{
    color: #000;
    background-color: rgba(170, 170, 170, 0.9);
    transition: all 0.2s;
    
}
`
const InfoBtn = styled.button`
@media ${(props) => props.theme.mobile} {
    text-align: start;
    padding-right: 1.2rem;
    font-size: 1rem !important;
    border-radius: 4px !important;
}
background-color: rgba(109, 109, 110, 0.7);
color: white;
&:hover{
    background-color: rgb(74, 74, 74);
    color: white;
}
display: flex;
flex-direction: row;
justify-content: start;
align-items: start;
cursor: pointer;
outline: none;
border: none;
font-size: 1rem;
font-weight: 700;
border-radius: 0.2vw;
padding: 0.6rem 2.0rem 0.6rem 1.2rem;
margin-right: 1rem;
&:hover{
    color: #000;
    background-color: rgba(170, 170, 170, 0.9);
    transition: all 0.2s;
}
`

const Description = styled.h1`
@media ${(props) => props.theme.mobile} {
    font-size: 0.8rem !important;
    width: auto !important;
}
width: 45rem;
line-height: 1.4;
padding-top: 1rem;
font-weight: 600;
font-size: 1.3rem;
max-width: 400px;
height: 80px;

`

const FadeBottom = styled.div`
@media ${(props) => props.theme.desktop} {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40rem;
}
z-index: -1; // 오류 수정
height: 7.4rem;
background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37,37,37,0.61),
    #111
);
`