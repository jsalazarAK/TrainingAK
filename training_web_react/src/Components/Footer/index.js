import React from 'react';
import './Footer.sass'

const Footer = (props)=>{
    
    return (
    <div className="orientation">
        <button onClick={props.onStartGameClick} disabled={props.disabled}>Whack!</button>
        <input type="text" id="playerName" placeholder= "Player Name" onChange={props.onPlayerNameChange} disabled={props.disabled}/>
    </div>);
}

export default Footer