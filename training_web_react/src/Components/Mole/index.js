import React from 'react';
import './MoleComponent.css'

const Mole=(props)=>{
    return (
        <div className="mole up" onClick={props.onButtonClick}>
        </div>

    );
}

export default Mole