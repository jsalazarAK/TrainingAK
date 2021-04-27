import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from '../../Components/Header';
import Game from '../../Components/Game';
import Footer from '../../Components/Footer'
import useSound from 'use-sound';


const App =(props) =>{

  //useHooks();

  const soundFail = "src/sounds/kick.wav";
  const soundHit = "src/sounds/hihat.wav";


  const [score,setScore] = useState(0)
  const [holes] = useState(9)
  const [initGame,setInitGame] = useState(false)
  const [lastHole,setLastHole] = useState(0)
  const [playSoundFail] = useSound(soundFail)
  const [playSoundHit] = useSound(soundHit)

  const minPeepTime= 200;
  const maxPeepTime= 1000;
  
  const startPeep = useRef(false);

  

  const IncreaseScore=(event)=>{
    event.stopPropagation();
    playSoundHit()
    if(initGame){
      setScore(previus => previus+1)
    }
  }

  const failHit=(event)=>{
    console.log("fallo")
    playSoundFail();
  }

  const StartGame=()=>{
    setInitGame(true)
    setLastHole(-1)
    setScore(0)

    setTimeout(() => {
      console.log("Game Over")
      setInitGame(false)
      setLastHole(-1)
      
  }, 10000)
  }

  const randomTime = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };


  const randomHole = () => {
    const idx = Math.floor(Math.random() * holes);
    if (idx === lastHole){
      return randomHole();
    } 
    setLastHole(idx)
  }

  const peep = () => {
    if(startPeep.current){
      randomHole();
      let time = randomTime(minPeepTime,maxPeepTime)

      console.log("init game-----")
      console.log(startPeep.current)
      setTimeout(() => {
        console.log("init game#######")
        console.log(startPeep.current)
        peep()
      }, time)
    }
  }

  useEffect(()=>{
    console.log("init game");
    console.log(initGame)
    console.log("--------------")
    startPeep.current = initGame;
    if(initGame){
      console.log("starting peep")
      peep()
    }
  },[initGame])

  return (
    <div className="App">
      <Header score={score}/>
      <Game numberOfHoles={holes} lastHole={lastHole} play={initGame} onButtonClick={IncreaseScore} onFailButton={failHit}/>
      <Footer onButtonClick={StartGame}/>
    </div>
  );
  
}

export default App
