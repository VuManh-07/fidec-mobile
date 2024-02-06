import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {navigate} from '../../navigate/navigation-service';

const WelcomeScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('MainScreen');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Fidec</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Màu nền đen
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Màu chữ trắng
  },
});

export default WelcomeScreen;
