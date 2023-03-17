import React from 'react';
import styled from 'styled-components'
import { useState, useEffect } from 'react';



const Navbar = styled.nav`
    position: fixed;
    top: 0;
    width: 100%;
    height: 30px;
    z-index: 1;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition-timing-function: ease;
    transition: all 0.5s;

    &.black{
        background-color: #111;
    }
`


const Logo = styled.img`
position: fixed;
left: 40px;
width: 80px;
object-fit: contain;
`

const Avatar = styled.img`
position: fixed;
right: 40px;
width: 30px;
object-fit: contain;

`

const Nav = () => {

    const [show,handleShow] = useState(false);

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            if(window.scrollY > 50){
                handleShow(true);
            } else {
                handleShow(false);
            }
        });
        return ()=> {
            window.removeEventListener('scroll', ()=>{});
        };
    },[]);

    return (
        <Navbar className={show ? '' : 'black'}>
            <Logo 
            alt='Netflix logo' 
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png'
            className='nav__logo'
            onClick={()=> window.location.reload()}
            />            
            <Avatar
            alt='User logged'
            src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41'
            className='avatar'
            />
        </Navbar>
    );
};

export default Nav;