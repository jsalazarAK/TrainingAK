import {createStore} from 'redux'
import rankingReducer from "../Reducer/rankingReducer"


const rankingStore = createStore(rankingReducer);

export default rankingStore;