import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import { countriesApi } from '../features/countries/countriesApi';
import  favoriteReducer  from '../features/countries/favoritesSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    favorites: favoriteReducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});