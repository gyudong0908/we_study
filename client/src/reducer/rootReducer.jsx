import { combineReducers } from 'redux';
import classCardsSlice from './classCardsSlice';
import userDataReducer from './userdata';

const rootReducer = combineReducers({
    classCards: classCardsSlice,
    userData: userDataReducer,
});

export default rootReducer;