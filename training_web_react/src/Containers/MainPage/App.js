import React from 'react';
import './App.css';
import Header from '../../Components/Header';
import Game from '../../Components/Game';
import Footer from '../../Components/Footer'

export default class App extends React.Component {

  state={
    score:0,
    holes:6,
    initGame:false,
    lastHole:-1,
    minPeepTime: 200,
    maxPeepTime: 1000
  }
  increaseScore=()=>{
    if(this.state.initGame)
      this.setState({score:this.state.score +1})
  }
  StartGame=()=>{
    this.setState({initGame: true,score:0},()=>this.peep())
    
    setTimeout(() => {
      this.setState({lastHole:-1,initGame: false})
      
  }, 10000)
  }

  randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };


  randomHole = () => {
    const idx = Math.floor(Math.random() * this.state.holes);
    console.log("hole selected")
    console.log(idx)
    if (idx === this.state.lastHole) return this.randomHole();
    this.setState({lastHole: idx})
  }

  peep = () => {
    this.randomHole();
    let time = this.randomTime(this.state.minPeepTime,this.state.maxPeepTime)
    console.log("random time")
    console.log(time)
    console.log("init game")
    console.log(this.state.initGame)
    if(this.state.initGame){
      setTimeout(() => {
        this.peep()
      }, time)
    }
  }

  render(){

    return (
      <div className="App">
        <Header score={this.state.score}/>
        <Game numberOfHoles={this.state.holes} lastHole={this.state.lastHole} play={this.state.initGame} onButtonClick={this.increaseScore}/>
        <Footer onButtonClick={this.StartGame}/>
      </div>
    );
  }
}
