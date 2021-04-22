import React from 'react';
import './FooterComponent.css'

export class Footer extends React.Component{

    render(){
        return (<button onClick={()=>this.props.onButtonClick()}>Whack!</button>);

    }

}