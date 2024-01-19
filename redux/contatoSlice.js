import { createSlice } from "@reduxjs/toolkit";

export const contatoSlice = createSlice({
  name: 'contato',

  initialState: {
    nome: '',
    telefone: '',
  },

  reducers: {
    addContato: (state, action) => {
      console.log('adicionar redux funcionando')
      return { ...state, ...action.payload };
    },
    removeContato: (state) => {
      console.log('remover redux funcionando')
      return { nome: '', telefone: '' };
    },
  },
});

export const { addContato, removeContato } = contatoSlice.actions;

export default contatoSlice.reducer;
