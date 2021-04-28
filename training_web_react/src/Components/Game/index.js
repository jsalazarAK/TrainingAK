import React from 'react';
import './Game.sass'
import  Hole  from "../Hole";

const Game =(props)=>{

    var _ = require('lodash')
    const holes = _.range(1,props.numberOfHoles+1); 
    const renderHoles=
            holes.map((number)=>
                <Hole key={number} play={props.play} keyValue={number} lastHole={props.lastHole} onHitSuccess={props.onHitSuccess} onHitFail={props.onHitFail}/>
            );
    
    return (
        <div className="game">
            {renderHoles}
        </div>
    );
}

export default Game