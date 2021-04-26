import React from 'react';
import './App.css';
import Header from '../../Components/Header';
import Game from '../../Components/Game';
import Footer from '../../Components/Footer'


export default class App extends React.Component {

  state={
    score:0,
    holes:9,
    initGame:false,
    lastHole:-1,
    minPeepTime: 200,
    maxPeepTime: 1000
  }
  increaseScore=(event)=>{
    event.stopPropagation();
    console.log("buen golpe")
    //useSound("../../sounds/hithat.wav");
    if(this.state.initGame)
      this.setState({score:this.state.score +1})
  }

  failHit=(event)=>{
    console.log("mal golpe")
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
    if (idx === this.state.lastHole) return this.randomHole();
    this.setState({lastHole: idx})
  }

  peep = () => {
    this.randomHole();
    let time = this.randomTime(this.state.minPeepTime,this.state.maxPeepTime)
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
        <Game numberOfHoles={this.state.holes} lastHole={this.state.lastHole} play={this.state.initGame} onButtonClick={this.increaseScore} onFailButton={this.failHit}/>
        <Footer onButtonClick={this.StartGame}/>
      </div>
    );
  }
}
