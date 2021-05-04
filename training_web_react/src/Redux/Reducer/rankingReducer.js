import * as actionTypes from '../ActionTypes/actionTypes'

const rankingReducer=(state = [],action)=>{
    let newState = [...state];
    switch(action.type){
        case actionTypes.ADD_RANKING:
            if(newState.length===0 || newState[newState.length-1].playerScore >= action.payload.playerScore){
                return [...state,{
                    playerName: action.payload.playerName,
                    playerScore: action.payload.playerScore
                }];
            }
            for (var index = 0; index < newState.length; index++) {
                if(newState[index].playerScore < action.payload.playerScore){
                    newState.splice(index,0,{
                        playerName: action.payload.playerName,
                        playerScore: action.payload.playerScore
                    });
                    break;
                }
            }
            
            return newState;
            
        case actionTypes.REMOVE_FROM_RANKING:
            newState.splice(action.payload.maxLength,1);
            return newState
        default:
            return state;
    }
}

export default rankingReducer;