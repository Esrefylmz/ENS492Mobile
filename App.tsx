import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NewDevicePage from './pages/NewDevice';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import WifiSearch from './pages/WifiSearch';
import ResetPassword from './pages/ResetPassword';
import SensorDetails from './pages/SensorDetails';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="New Device" component={NewDevicePage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="WifiSearch" component={WifiSearch} />
        <Stack.Screen name="Reset Password" component={ResetPassword} />
        <Stack.Screen name="Sensor Detail" component={SensorDetails} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
