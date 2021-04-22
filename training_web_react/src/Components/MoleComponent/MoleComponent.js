import React from 'react';
import './MoleComponent.css'

export class Mole extends React.Component{

    render(){
        return (
            <div className="mole up" onClick={()=>this.props.onButtonClick()}>
            </div>

        );

    }

}