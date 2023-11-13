import { createSlice } from '@reduxjs/toolkit';


const classCardsSlice = createSlice({
  name: 'classCardsSlice',
  initialState: [],
  reducers: {
    setClassCards: (state, action) => {
      return [...state, action.payload];
    },
  },
});

export const { setClassCards } = classCardsSlice.actions;
export default classCardsSlice.reducer;