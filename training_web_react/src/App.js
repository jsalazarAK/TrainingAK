import React from 'react';
import './App.css';
import { Header } from './Components/HeaderComponent/HeaderComponent';
import { Game } from './Components/GameComponent/GameComponent';
import { Footer} from './Components/FooterComponent/FooterComponent'

export class App extends React.Component {

  state={
    score:0,
    holes:6,
    timeUp:false
  }
  increaseScore=()=>{
    this.setState({score:this.state.score +1})
  }
  StartGame=()=>{
    this.setState({timeUp: true})
  }

  render(){

    return (
      <div className="App">
        <Header score={this.state.score}/>
        <Game numberOfHoles={this.state.holes} play={this.state.timeUp} onButtonClick={this.increaseScore}/>
        <Footer onButtonClick={this.StartGame}/>
      </div>
    );
  }
}
