import React from 'react';
import requests from '../../api/requests';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import Row from '../../components/Row';
const MainPage = () => {
    return (
        <div>
            <Banner/>
            <Row 
        title="NETFLIX ORIGINALS"
        id="NO"
        fetchUrl={requests.fetchNeflixOriginals}
        isLargeRow
        />
        <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}/>
        <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}/>
        <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies}/>
        <Row title="Comedy Movies" id="CM" fetchUrl={requests.fetchComedyMovies}/>
        
        </div>
        
    );
};

export default MainPage;