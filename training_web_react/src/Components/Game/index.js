import React from 'react';
import './GameComponent.css'
import  Hole  from "../Hole";

const Game =(props)=>{
    var _ = require('lodash')
    const holes = _.range(1,props.numberOfHoles+1);   
    return (
        <div className="game">
            {holes.map((number)=>
                <Hole key={number} play={props.play} keyValue={number} lastHole={props.lastHole} onButtonClick={props.onButtonClick}/>
            )}
        </div>
    );
}

export default Game