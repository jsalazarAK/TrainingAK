import * as actionTypes from '../Action/actionTypes'


const rankingReducer=(state = [],action)=>{
    switch(action.type){
        case actionTypes.ADD_RANKING:
            return addRanking(state,action);
        case actionTypes.REMOVE_FROM_RANKING:
            return removeFromRanking(state,action);
        default:
            return state;
    }
}

const addRanking=(state,action)=>{
    let newState = [...state];
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
}
const removeFromRanking=(state,action)=>{
    let newState = [...state];
    newState.splice(action.payload.maxLength,1);
    return newState;
}

export default rankingReducer;