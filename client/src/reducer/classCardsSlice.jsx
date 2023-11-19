import { createSlice } from '@reduxjs/toolkit';


const classCardsSlice = createSlice({
  name: 'classCardsSlice',
  initialState: [],
  reducers: {
    setClassCards: (state, action) => {
      return [...state, ...action.payload];
    },
    deleteClassCards: () => {
      return [];
    },
    chageClassCards: (state, action) => {
      return action.payload;
    }
  },
});

export const { setClassCards } = classCardsSlice.actions;
export const { deleteClassCards } = classCardsSlice.actions;
export const { chageClassCards } = classCardsSlice.actions;

export default classCardsSlice.reducer;