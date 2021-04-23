import React from 'react';
import { Mole } from '../MoleComponent/MoleComponent';
import './HoleComponent.css'

export class Hole extends React.Component{
    

    getClassName=()=>{
        if(this.props.play && this.props.keyValue === this.props.lastHole){
            return "hole up";
        }
        return "hole";
    }

    render(){
        return (
            <div className={this.getClassName()}>
                <Mole onButtonClick={this.props.onButtonClick}/>
            </div>

        );

    }

}