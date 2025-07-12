// screens/OrderConfirmationScreen.js

import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';

export default function OrderConfirmationScreen({ route, navigation }) {
  const { formData } = route.params;

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/createdailyjob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);
      if (result.issuccess === true) {
        navigation.navigate('OrderSuccess');
      } else {
        alert('Submission failed');
      }
    } catch (error) {
      alert('Network error');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Confirm Your Order</Text>
      {Object.entries(formData).map(([key, value]) => (
        <Text key={key} style={styles.item}>
          <Text style={{ fontWeight: 'bold' }}>{key.replace(/_/g, ' ')}:</Text>{' '}
          {value instanceof Date ? value.toDateString() : value}
        </Text>
      ))}
      <Button title="Submit Order" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  item: { marginBottom: 8 },
});
