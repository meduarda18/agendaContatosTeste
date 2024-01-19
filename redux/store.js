import { configureStore } from '@reduxjs/toolkit';
import contatoReducer from './contatoSlice';

export default configureStore({
  reducer: {
    contato: contatoReducer,
  },
  //tentando ver o redux funcionando no navegador
  devTools: process.env.NODE_ENV !== 'production',
});
