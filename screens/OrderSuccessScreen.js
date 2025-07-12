// screens/OrderSuccessScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function OrderSuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Order Submitted Successfully!</Text>
      <Text style={styles.message}>Your order has been processed. Thank you!</Text>

      <Button title="Back to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
});
