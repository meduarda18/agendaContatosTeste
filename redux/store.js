import { configureStore } from '@reduxjs/toolkit';
import contatoReducer from './contatoSlice';

export default configureStore({
  reducer: {
    contato: contatoReducer,
  },
});
