import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import R from '../../assets/R';
import {HEIGHT, WIDTH} from '../../utils/functions';

type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  setModalVisible: SetStateFunction<boolean>;
}

const Header = ({setModalVisible}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={R.images.loggo1x} style={styles.logo} />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image source={R.images.menu} style={styles.menuIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: R.colors.color_tone_1,
    padding: 10,
    height: HEIGHT(58),
  },
  logo: {
    width: WIDTH(44),
    height: HEIGHT(44),
  },
  menuIcon: {
    width: WIDTH(32),
    height: HEIGHT(32),
  },
});

export default Header;
