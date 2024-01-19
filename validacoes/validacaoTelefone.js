
import { Alert } from 'react-native';

export const validarTelefone = (telefone, checkIfExists) => {
  const telefonePattern = /\d{2} \d{1} \d{4}-\d{4}/;

  if (!telefonePattern.test(telefone)) {
    Alert.alert('Telefone inválido', 'Por favor, preencha o telefone no seguinte formato xx x xxxx-xxxx.');
    return false;
  }

  if (checkIfExists) {
    // Implemente a lógica de verificação de existência do telefone aqui
    Alert.alert('Telefone existente', 'Esse telefone já existe na sua lista de contatos.');
    return false;
  }

  return true;
};
