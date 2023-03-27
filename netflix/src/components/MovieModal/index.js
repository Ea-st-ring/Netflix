import React, { useRef } from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../../hooks/useOnClickOutside';
const MovieModal = ({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen,
}) => {

    const truncate = (str) => {
        return str?.length > 200 ? str.substr(0, 199) + "..." : str;
    };
    const ref = useRef();
    useOnClickOutside(ref,()=>{setModalOpen(false)}); // ref, handler

    return (
        <Presentation>
            <Wrapper>
                <Modal ref={ref}>
                <ModalClose onClick={()=> setModalOpen(false)}>
                        X
                    </ModalClose>
                <Poster
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                    alt='modal__poster-img'
                />

                <Content>
                    <Details>
                        <UserPerc>
                            100% for you &nbsp;
                        </UserPerc>
                        {release_date ? release_date : first_air_date}

                    </Details>
                    <Title style={{marginLeft : '0'}}>{title ? title : name}</Title>
                    <Overview>평점: {vote_average}</Overview>
                    <Overview className='overview'>{overview.length > 200 ? truncate(overview) : overview}</Overview>
                </Content>
                </Modal>
            </Wrapper>
        </Presentation>
    );
};

const Presentation = styled.div`
    z-index: 1200;
    position: absolute;
`

const Wrapper = styled.div`
    position: fixed;
    inset: 0px;
    background-color: rgb(0 0 0 / 71%);
    -webkit-tap-highlight-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (${(props) => props.theme.modal}) {
        align-items: unset;
        padding-top: 2rem;
    }
    @media screen and (${(props) => props.theme.mobile}){
        padding: 0;
    }
`



const Modal = styled.div`
    position: relative;
    max-width: 800px;
    max-height: 99vh;
    box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
    background: #111;
    overflow: hidden;
    border-radius: 8px;
    transition: all 400ms ease-in-out 2s;
    @keyframes fadeIn {
    from {
    opacity: 0;
    transform: scale(0.5);
    }
    to {
    opacity: 1;
    transform: scale(1);
    }
    }
    animation: fadeIn 400ms;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar{
        display: none;
        visibility: hidden;
    }
    @media screen and (${(props) => props.theme.modal}){
        overflow-y: scroll;
    }
    @media screen and (${(props) => props.theme.mobile}){
        overflow-y: scroll !important;
    }
`
const ModalClose = styled.span`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    font-size: 24px;
`

const Poster = styled.img`
    width: 800px;
    height: auto;
`

const Content = styled.div`
    padding: 15px;
    color: white;
`

const Details = styled.p`
    font-weight: 600;
    font-size: 18px;
    @media screen and (${(props) => props.theme.mobile}){
        font-size: 16px;
    }
    margin: 0;
`

const UserPerc = styled.span`
    color: #46d369;
`

const Title = styled.h2`
    padding: 0;
    font-size: 32px;
    text-align: start;
    margin: 0;
    margin-top: 3px;
`

const Overview = styled.p`
    font-size: 18px;
    line-height: 1.5;
    @media screen and (${(props) => props.theme.mobile}){
        font-size: 14px;
    }
`


export default MovieModal;