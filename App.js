// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Import Screens
import HomeScreen from './src/screens/HomeScreen';
import AddLeadScreen from './src/screens/AddLeadScreen';
import LeadDetailsScreen from './src/screens/LeadDetailsScreen';
import { colors } from './src/theme/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Student Leads' }} 
        />
        <Stack.Screen 
          name="AddLead" 
          component={AddLeadScreen} 
          options={{ title: 'Add New Lead' }} 
        />
        <Stack.Screen 
          name="LeadDetails" 
          component={LeadDetailsScreen} 
          options={{ title: 'Lead Details' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
