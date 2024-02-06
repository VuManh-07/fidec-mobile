import 'react-native-get-random-values';
import '@ethersproject/shims';
import React, {useEffect} from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import {RootView} from './src/navigate/RootView';
import {navigationRef} from './src/navigate/navigation-service';
import AppLoad from './src/screens/Appload';
import axiosInstance from './src/utils/axios/axios';
import {setIsLogin} from './src/store/StoreComponents/account';

global.Buffer = global.Buffer || require('buffer').Buffer;

const App = () => {
  const isLoading = useSelector((state: any) => state.loading.isLoading);

  const dispatch = useDispatch();

  const getIdCard = async () => {
    const response = await axiosInstance.get('/card');
    console.log('data', response.data);
    if (response.data.id_card) {
      dispatch(setIsLogin(true));
    } else {
      dispatch(setIsLogin(false));
    }
  };

  useEffect(() => {
    getIdCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <AppLoad loading={isLoading} />
      <NavigationContainer ref={navigationRef}>
        <View style={styles.container}>
          <RootView />
        </View>
      </NavigationContainer>
      <FlashMessage position="top" style={styles.flashMessage} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  flashMessage: {
    zIndex: 9999,
  },
});

export default App;
