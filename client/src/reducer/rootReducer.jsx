import { combineReducers } from 'redux';
import classCardsSlice from './classCardsSlice';


const rootReducer = combineReducers({
    classCards: classCardsSlice,
});

export default rootReducer;