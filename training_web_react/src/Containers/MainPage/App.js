import React, { useEffect, useRef, useState } from 'react';
import './App.sass';
import Header from '../../Components/Header';
import Game from '../../Components/Game';
import Footer from '../../Components/Footer'


const App =(props) =>{

  //useHooks();

  const soundFail = "src/sounds/kick.wav";
  const soundHit = "src/sounds/hihat.wav";


  const [score,setScore] = useState(0)
  const [holes] = useState(9)
  const [initGame,setInitGame] = useState(false)
  const [lastHole,setLastHole] = useState(0)
  const playSoundFail = new Audio(soundFail)
  const playSoundHit = new Audio(soundHit)

  const minPeepTime= 200;
  const maxPeepTime= 1000;
  
  const startPeep = useRef(false);

  
  const playSound=(promise)=>{
    if(promise!== null){
      promise.then(()=>{

      }).catch((err)=>{

      });
    }
  }


  const IncreaseScore=(event)=>{
    event.stopPropagation();
    playSound(playSoundHit.play())
    if(initGame){
      setScore(previus => previus+1)
    }
  }

  const failHit=(event)=>{
    playSound(playSoundFail.play())
  }

  const StartGame=()=>{
    setInitGame(true)
    setLastHole(-1)
    setScore(0)

    setTimeout(() => {
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
      setTimeout(() => {
        peep()
      }, time)
    }
  }

  useEffect(()=>{
    startPeep.current = initGame;
    if(initGame){
      peep()
    }
  },[initGame])

  return (
    <div className="App">
      <Header score={score}/>
      <Game numberOfHoles={holes} lastHole={lastHole} play={initGame} onHitSuccess={IncreaseScore} onHitFail={failHit}/>
      <Footer onButtonClick={StartGame}/>
    </div>
  );
  
}

export default App
