import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import R from '../../assets/R';
import {HEIGHT} from '../../utils/functions';
import IconTabTools from '../../components/IconTabTools';

const dataTabTools = [
  {id: 1, name: 'Buy', icon: R.images.BuyIcon, w: 48, h: 56, navigate: 'Buy'},
  {
    id: 2,
    name: 'QR Code',
    icon: R.images.QRCodeIcon1x,
    w: 45,
    h: 56,
    navigate: 'QRCode',
  },
  {
    id: 3,
    name: 'Send',
    icon: R.images.SendIcon,
    w: 60,
    h: 56,
    navigate: 'Send',
  },
  {
    id: 4,
    name: 'Import Token',
    icon: R.images.ImportIcon,
    w: 46,
    h: 56,
    navigate: 'ImportToken',
  },
];

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  setModalVisibleSend: SetStateFunction<boolean>;
  setModalVisibleTokenImport: SetStateFunction<boolean>;
}

const ToolsTab = ({setModalVisibleSend, setModalVisibleTokenImport}: Props) => {
  const openItem = (name: string) => {
    if (name === 'Send') {
      setModalVisibleSend(true);
    } else if (name === 'Import Token') {
      setModalVisibleTokenImport(true);
    }
  };
  return (
    <View style={styles.container}>
      {dataTabTools.map(item => {
        return (
          <View key={item.id} style={styles.tool}>
            <TouchableOpacity onPress={() => openItem(item.name)}>
              <IconTabTools iconName={item.name} />
            </TouchableOpacity>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: R.colors.color_tone_3,
    borderRadius: 15,
    elevation: 5,
    shadowColor: 'white',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  tool: {
    height: HEIGHT(90),
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginTop: 4,
  },
});

export default ToolsTab;
