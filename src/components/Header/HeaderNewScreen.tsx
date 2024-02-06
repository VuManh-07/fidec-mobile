import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import * as Icon from 'react-native-feather';
import {HEIGHT, WIDTH} from '../../utils/functions';
import {goBack} from '../../navigate/navigation-service';

interface Props {
  name: string;
}

const HeaderNewScreen = ({name}: Props) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity style={styles.backIcon} onPress={() => goBack()}>
            <Icon.ArrowLeftCircle
              color="white"
              width={WIDTH(42)}
              height={HEIGHT(42)}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>{name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#333333',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    // height: 30,
    width: 64,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});

export default HeaderNewScreen;
