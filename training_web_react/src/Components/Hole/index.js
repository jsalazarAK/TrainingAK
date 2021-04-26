import React from 'react';
import Mole  from '../Mole';
import './HoleComponent.css'

const Hole=(props)=>{
    

    const getClassName=()=>{
        if(props.play && props.keyValue === props.lastHole){
            return "hole up";
        }
        return "hole";
    }

    return (
        <div className={getClassName()}>
            <Mole onButtonClick={props.onButtonClick}/>
        </div>

    );   
}

export default Hole