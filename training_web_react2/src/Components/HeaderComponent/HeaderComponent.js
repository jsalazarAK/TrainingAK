import React from 'react';
import './HeaderComponent.css'

export class Header extends React.Component{

    render(){
        return (<h1>Whack-a-Mole! <span>{this.props.score}</span> </h1>);

    }

}
