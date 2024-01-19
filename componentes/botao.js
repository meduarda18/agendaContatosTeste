import { View, Text, TouchableOpacity } from 'react-native';

export default function Botao(props) {
  const { title, color, titleColor, width,  onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={{
        backgroundColor: color != undefined ? color : '#aaaaaa', 
        padding: 10, 
        paddingHorizontal: 35, 
        borderRadius: 50,
        width: width != undefined ? width : -1,
        alignItems: 'center'
      }}>
        <Text style={{color: titleColor != undefined ? titleColor : 'black'}}>{title != undefined ? title : 'Título'}</Text>
      </View>
    </TouchableOpacity>
  );
}
