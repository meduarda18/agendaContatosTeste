import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Botao from '../componentes/botao';
import { useDispatch } from 'react-redux';

import { validarTelefone } from '../validacoes/validacaoTelefone';
import { addContato } from '../redux/contatoSlice';

export default function TelaAdicionar({navigation}){

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  //redux
  const dispatch = useDispatch();

  //função assíncrona
  async function handleNew(){
    //validação para não permitir que o usuário adicione um contato sem informações
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }
    //validação do telefone
    const isTelefoneValido = validarTelefone(telefone, false);

    if(!isTelefoneValido){
      return;
    }

    const id = uuid.v4();

    //formato do objeto que vai guardar nossos dados
    const newData = {
      id,
      nome,
      telefone,
    }

    //Buscando os itens que já estão no AsyncStorage
    const contatosString = await AsyncStorage.getItem("@agendaTelefonica:contatos");
    
    const contatosData = contatosString ? JSON.parse(contatosString) : [];
    
    const contatosArray = Array.isArray(contatosData) ? contatosData : [contatosData];
  
    const novoContatoData = [...contatosArray, newData];
    
    await AsyncStorage.setItem('@agendaTelefonica:contatos', JSON.stringify(novoContatoData));

    //redux
    dispatch(addContato(nome, telefone));

    navigation.navigate('Agenda de Contatos');
  }


  return(
    <View style={styles.container}>
      <Text style={{margin: 7, color: '#001B7B'}}>Nome:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNome}
        value={nome}
        placeholder="Digite seu nome"
      />
      <Text style={{margin: 7, color: '#001B7B'}}>Telefone:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTelefone}
        value={telefone}
        placeholder="Digite seu número"
        keyboardType="numeric"
      />
      <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 40}} >
        <Botao
            title='Adicionar'
            titleColor='white'
            color='#001B7B'
            width={170}
            onPress={ handleNew }
          />  
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    alignItems: 'left', 
    justifyContent: 'flex-start',
  },
  input: {
    height: 45,
    width: 400,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30, 
    borderBottomRightRadius: 30,
  },
})
