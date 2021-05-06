import React, {  useState } from 'react';
import './Header.sass'
import rankingStore from '../../Store/Store/rankingStore';
import RankingTable from '../Ranking';



const Header =(props)=>{
    
    const [ranking,setRanking] = useState([{}])

    rankingStore.subscribe(()=>{
        
        let newState=rankingStore.getState();
        setRanking(newState);

    });

    return (
    <div>
        <h1>Whack-a-Mole!</h1>  
        <h3>Level {props.actualLevel+1} Score {props.score}</h3>     
        <RankingTable rankingValue={ranking} />

    </div>);
}

export default Header