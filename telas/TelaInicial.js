import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Botao from '../componentes/botao';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { removeContato } from '../redux/contatoSlice';


export default function TelaInicial ({navigation}) {

  const [contatos, setContatos] = useState([]);
  const dispatch = useDispatch();
  
  async function handleFetchData(){
    const response = await AsyncStorage.getItem("@agendaTelefonica:contatos");
    const contatos = response ? JSON.parse(response) : [{}];
    setContatos(contatos);
  }

  useFocusEffect(useCallback(() => {
    handleFetchData();
  }, []));
  

  const handleExcluirContato = async (contatoId) => {
    try {
      // Obtém os contatos do AsyncStorage
      const contatosString = await AsyncStorage.getItem('@agendaTelefonica:contatos');
      if (contatosString) {
        const contatosData = JSON.parse(contatosString);
        const novosContatosData = contatosData.filter((contato) => contato.id !== contatoId);
  
        await AsyncStorage.setItem('@agendaTelefonica:contatos', JSON.stringify(novosContatosData));
  
        dispatch(removeContato());

        setContatos(novosContatosData);
      }
    } catch (error) {
      console.error('Erro ao excluir contato:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.valores}>
      <Text style={{color:'#001B7B', fontSize: 17}}>{item.nome}</Text>
      <Text style={{fontSize: 17}}>{item.telefone}</Text>
      <TouchableOpacity onPress={() => handleExcluirContato(item.id)}>
        <Image
          source={require('../imagens/lixeira.png')}
          style={{width: 20, height: 22, alignSelf: 'flex-end'}}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList 
        data={contatos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        
      />
      <View style={{flexDirection: 'row', alignSelf:'flex-end', paddingBottom:50, paddingRight:20}}>
        <Botao
          title='Adicionar contato'
          titleColor='white'
          color='#001B7B'
          
          onPress={ () => navigation.navigate('Adicionar Contato') }
        />
      </View>
        
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    alignItems: 'left', 
    justifyContent: 'center', 
  },
  titulo: {
    fontSize: '16',
    color: '#001B7B',
  },
  valores: {
    backgroundColor: '#D5D9DF', 
    padding: 16, 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30, 
    margin: 8,
  }
  /*botaoRedondo: {
    flexDirection: 'row',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth:2,
    borderBottomColor:'black',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 150,
    right: 20
  },
  imagemBotao: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  textBotao: {
    color: 'black',
    fontSize: 16,
    alignItems: 'center',
  },
*/
});

