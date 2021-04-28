import React from 'react';
import Mole  from '../Mole';
import './Hole.sass'

const Hole=(props)=>{
    const getClassName = `hole ${props.play && props.keyValue === props.lastHole?'up':''}`;

    return (
        <div className={getClassName()} onClick={props.onHitFail}>
            <Mole onHitSuccess={props.onHitSuccess}/>
        </div>

    );   
}

export default Hole