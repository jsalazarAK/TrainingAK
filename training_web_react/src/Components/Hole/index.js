import React from 'react';
import Mole  from '../Mole';
import './Hole.sass'

const Hole=(props)=>{
    

    const getClassName=()=>{
        if(props.play && props.keyValue === props.lastHole){
            return "hole up";
        }
        return "hole";
    }

    return (
        <div className={getClassName()} onClick={props.onFailButton}>
            <Mole onButtonClick={props.onButtonClick}/>
        </div>

    );   
}

export default Hole