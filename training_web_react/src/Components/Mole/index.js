import React from 'react';
import './Mole.sass'

const Mole=(props)=>{
    return (
        <div className="mole" onClick={props.onHitSuccess}>
        </div>

    );
}

export default Mole