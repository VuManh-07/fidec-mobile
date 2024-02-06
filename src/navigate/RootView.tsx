// import {Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import R from '../assets/R';
import HomeScreen from '../screens/Home';
import MarketplaceScreen from '../screens/Marketplace';
import ConnectScreen from '../screens/Connect';
import Welcome from '../screens/Welcome';
import IconTab from '../components/IconTab';
import {HEIGHT, WIDTH} from '../utils/functions';
import {StyleSheet} from 'react-native';
import LoginScreen from '../screens/Login';
import SendScreen from '../screens/Send';
import ChatBotScreen from '../screens/ChatBot';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function AuthScreens() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: '#EEC141',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <IconTab
              iconName="Home"
              color={color}
              width={WIDTH(32)}
              height={HEIGHT(32)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{
          tabBarLabel: 'Marketplace',
          tabBarIcon: ({color}) => (
            <IconTab
              iconName="Marketplace"
              color={color}
              width={WIDTH(32)}
              height={HEIGHT(32)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Connect"
        component={ConnectScreen}
        options={{
          tabBarLabel: 'Connect',
          tabBarIcon: ({color}) => (
            <IconTab
              iconName="Connect"
              color={color}
              width={WIDTH(32)}
              height={HEIGHT(32)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export const RootView = () => {
  return (
    <Stack.Navigator
      screenOptions={({}) => ({
        headerShown: false,
      })}
      initialRouteName="welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainScreen" component={AuthScreens} />
      <Stack.Screen name="Send" component={SendScreen} />
      <Stack.Screen name="ChatBot" component={ChatBotScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: HEIGHT(60),
    backgroundColor: R.colors.background,
  },
});
