import React, { useEffect, useRef, useState } from 'react';
import './App.sass';
import Header from '../../Components/Header';
import Game from '../../Components/Game';
import Footer from '../../Components/Footer';
import rankingStore from '../../Redux/Store/rankingStore';
import * as actionTypes from '../../Redux/ActionTypes/actionTypes'


const App =(props) =>{

  //useHooks();

  const soundFail = "src/sounds/kick.wav";
  const soundHit = "src/sounds/hihat.wav";
  const MAX_RANKING_SIZE=5;
  const minPeepTime= 200;
  const maxPeepTime= 1000;
  const GAME_DURATION=10000;
  const playSoundFail = new Audio(soundFail)
  const playSoundHit = new Audio(soundHit)
  const NEW_LEVEL = 5; // AMOUNT OF POINTS NEEDED TO INCREASE YOUR LEVEL
  const SPEED_REDUCTION = 0.05; // MORE LVL


  /************************************
  *************************************
  **************HOOKS******************
  *************************************
  *************************************
  */

  const [score,setScore] = useState(0)
  const [holes] = useState(9)
  const [initGame,setInitGame] = useState(false)
  const [lastHole,setLastHole] = useState(0)
  const [PlayerName, setPlayerName] = useState('')
  const [DisableFooter,SetDisableFooter] = useState(false)
  const [actualLevel,setActualLevel] = useState(0)

  

  const startPeep = useRef(false);

  useEffect(()=>{
    startPeep.current = initGame;
    if(initGame){
      peep()
    }
  },[initGame])

  useEffect(()=>{
    if(!initGame && score>0){
      addToStore();
      if(rankingStore.getState().length>MAX_RANKING_SIZE){
          removeFromStore();
      }
    }
  },[initGame,score,PlayerName])

  useEffect(()=>{
    if(score>0 && score%NEW_LEVEL===0){
      setActualLevel(previus => previus+1)
    }
  },[score])


  /************************************
  *************************************
  ************FUNCTIONS****************
  *************************************
  *************************************
  */
  
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
      setScore(previus => previus+1);
    }
  }

  const failHit=(event)=>{
    playSound(playSoundFail.play());
  }

  const StartGame=()=>{
    setInitGame(true)
    setLastHole(-1)
    setScore(0);
    SetDisableFooter(true);
    setActualLevel(0)

    setTimeout(() => {
      setInitGame(false);
      setLastHole(-1);
      setScore(0);
      SetDisableFooter(false);
      
  }, GAME_DURATION)
  }

  const randomTime = (min, max) => {
    let percent = 1-SPEED_REDUCTION*actualLevel;
    if(percent<0){
        percent=0;
    }
    return Math.round(Math.random() * (max - min) + min)*percent;
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

  /************************************
  *************************************
  **************REDUX******************
  *************************************
  *************************************
  */
  const addToStore=()=>{
    rankingStore.dispatch({
      type: actionTypes.ADD_RANKING,
      payload: {
        playerName: PlayerName?PlayerName:"Anonymous",
        playerScore: score
      }
    })
  }

  const removeFromStore=()=>{
    rankingStore.dispatch({
      type: actionTypes.REMOVE_FROM_RANKING,
      payload: {
        maxLength: MAX_RANKING_SIZE
      }
    })
  }

  /************************************
  *************************************
  *************RETURN******************
  *************************************
  *************************************
  */

  return (
    <div className="App">
      <Header score={score} actualLevel={actualLevel}/>
      <Game numberOfHoles={holes} lastHole={lastHole} play={initGame} onHitSuccess={IncreaseScore} onHitFail={failHit}/>
      <Footer onStartGameClick={StartGame} onPlayerNameChange={event => setPlayerName(event.target.value)} disabled={DisableFooter}/>
    </div>
  );
  
}

export default App
