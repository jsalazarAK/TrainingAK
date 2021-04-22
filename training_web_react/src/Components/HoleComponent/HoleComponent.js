import React from 'react';
import { Mole } from '../MoleComponent/MoleComponent';
import './HoleComponent.css'

export class Hole extends React.Component{

    

    render(){
        const showMole=()=>{
            return 'up';
        }
        return (
            <div className="hole up">
                <Mole onButtonClick={this.props.onButtonClick}/>
            </div>

        );

    }

}