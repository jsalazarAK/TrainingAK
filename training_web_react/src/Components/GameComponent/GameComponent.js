import React from 'react';
import './GameComponent.css'
import { Hole } from "../HoleComponent/HoleComponent";

export class Game extends React.Component{

    



    render(){
        var _ = require('lodash')
        const holes = _.range(1,this.props.numberOfHoles+1);



        
        return (
            <div className="game">
                {holes.map((number)=>
                    <Hole key={number} play={this.props.play} keyValue={number} lastHole={this.props.lastHole} onButtonClick={this.props.onButtonClick}/>
                )}

            </div>

        );

    }

}