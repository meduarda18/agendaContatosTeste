import React from 'react';
import NavegadorPrincipal from './navegadores/NavegadorPrincipal';
import { Provider } from 'react-redux';

import store from './redux/store';

export default function App() {
  return(
    <Provider store={store}>
      <NavegadorPrincipal />
    </Provider>
  )
}
