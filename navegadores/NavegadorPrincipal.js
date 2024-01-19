import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaInicial from '../telas/TelaInicial';
import TelaAdicionar from '../telas/TelaAdicionar';

const Stack = createStackNavigator();

export default function NavegadorPrincipal(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          options={{
            headerTitleStyle: {
              color: '#001B7B',
            },
          }}
          name='Agenda de Contatos' 
          component={TelaInicial}  
        />
        <Stack.Screen 
        options={{
            headerTitleStyle: {
            color: '#001B7B',
            },
          }}
          name='Adicionar Contato' 
          component={TelaAdicionar} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}