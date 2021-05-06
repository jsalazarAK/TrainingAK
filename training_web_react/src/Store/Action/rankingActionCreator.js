
import * as actionTypes from '../../Store/Action/actionTypes'

export const addRanking= (PlayerName,score)=>
{
    return {
        type: actionTypes.ADD_RANKING,
        payload: {
          playerName: PlayerName?PlayerName:"Anonymous",
          playerScore: score
        }
      }
}

export const removeFromRanking= (maxRankingSize)=>
{
    return {
        type: actionTypes.REMOVE_FROM_RANKING,
        payload: {
          maxLength: maxRankingSize
        }
      }
}