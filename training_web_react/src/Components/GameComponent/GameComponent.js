import React from 'react';
import './GameComponent.css'
import { Hole } from "../HoleComponent/HoleComponent";

export class Game extends React.Component{

    render(){

        let lastHole
        var _ = require('lodash')
        const holes = _.range(1,this.props.numberOfHoles+1);

        this.randomTime = (min, max) => {
            return Math.round(Math.random() * (max - min) + min);
        };

        this.randomHole = () => {
            const idx = Math.floor(Math.random() * holes.length);
            if (idx === lastHole) return this.randomHole();
            lastHole = idx;
            return lastHole;
        }

        console.log("DESDE GAMECOMPONENT")
        console.log(this.props.play)
        
        return (
            <div className="game">
                {holes.map((number)=>
                    <Hole key={number} play={this.props.play} onButtonClick={this.props.onButtonClick}/>
                )}

            </div>

        );

    }

}