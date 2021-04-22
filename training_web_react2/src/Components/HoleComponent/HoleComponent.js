import React from 'react';
import { Mole } from '../MoleComponent/MoleComponent';
import './HoleComponent.css'

export class Hole extends React.Component{

    render(){
        return (
            <div className="hole">
                <Mole/>
            </div>

        );

    }

}