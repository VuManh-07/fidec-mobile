import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HeaderSend = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Transaction</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#333333',
  },
  headerText: {
    fontSize: 24,
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default HeaderSend;
