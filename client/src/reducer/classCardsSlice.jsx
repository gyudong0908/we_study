import { createSlice } from '@reduxjs/toolkit';


const classCardsSlice = createSlice({
  name: 'classCardsSlice',
  initialState: [],
  reducers: {
    setClassCards: (state, action) => {
      return [...state, ...action.payload];
    },
    deleteClassCards: ()=>{
      return [];
    }
  },
});

export const { setClassCards } = classCardsSlice.actions;
export const { deleteClassCards } = classCardsSlice.actions;

export default classCardsSlice.reducer;