import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "AI Günlük Asistanım", headerTitleStyle: { color: "#3A6EA5", fontSize: 20, fontWeight: "bold", }, }} />

        <Stack.Screen name="History" component={HistoryScreen} options={{ title: "Geçmiş", headerTitleStyle: { color: "#3A6EA5", fontSize: 20, }, }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
