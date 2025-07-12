import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen'; // <-- New import
import OrderFormScreen from '../screens/OrderFormScreen'; // <-- New import
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen'; // <-- New import
import OrderSuccessScreen from '../screens/OrderSuccessScreen'; // <-- New import



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="OrderForm" component={OrderFormScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
  <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
}
