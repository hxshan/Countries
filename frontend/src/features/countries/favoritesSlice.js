import { createSlice } from '@reduxjs/toolkit';

const loadFromStorage = () => {
    try {
      const storedFavorites = localStorage.getItem('favorites');
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  };

  
const favoritesSlice = createSlice({

    name:'favorites',
    initialState:loadFromStorage(),
    reducers:{
        addFav:(state,action) =>{
            if (!state.find(c => c.cca3 === action.payload.cca3)) {
                state.push(action.payload);
                localStorage.setItem('favorites', JSON.stringify(state));
            }
        },
        removeFav:(state,action) =>{
            const newfavs = state.filter(country => country.cca3 != action.payload)
            localStorage.setItem('favorites', JSON.stringify(newfavs));
            return newfavs
        }
    }

})

export const { addFav, removeFav } = favoritesSlice.actions;
export default favoritesSlice.reducer;
