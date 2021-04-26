import React from 'react';
import './Header.css'

const Header =(props)=>{
    return (<h1>Whack-a-Mole! <span>{props.score}</span> </h1>);
}

export default Header