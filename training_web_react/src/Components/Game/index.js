import React from 'react';
import './Game.sass'
import  Hole  from "../Hole";

const Game =(props)=>{

    var _ = require('lodash')
    const holes = _.range(1,props.numberOfHoles+1); 
    const renderHoles=()=>{
         
        return (
            holes.map((number)=>
                <Hole key={number} play={props.play} keyValue={number} lastHole={props.lastHole} onButtonClick={props.onButtonClick} onFailButton={props.onFailButton}/>
        
            )
        )
    }

     
    return (
        <div className="game">
            {renderHoles()}
        </div>
    );
}

export default Game