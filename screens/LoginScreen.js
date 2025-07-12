import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';


const LoginSchema = Yup.object().shape({
  username: Yup.string().min(4, 'Too Short!').required('Username is required'),
  password: Yup.string().min(6, 'Password too short!').required('Password is required'),
});

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const handleLogin = async (values) => {
    setLoading(true); // Show loader
    try {
      const response = await fetch('http://localhost:3000/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (data.user.status === true) {
        console.log('Login successful:', data);
        // Alert.alert('Login Successful', `Welcome ${data.user.full_name}`);
        setLoading(false); // Hide loader
        Toast.show({
          type: 'success',
          text1: 'Login successful',
          text2: 'Welocme to Daily Job',
          position: 'top'
        });
        setTimeout(() => {  
        }, 3000);
console.log('Navigating to OrderForm...');
        navigation.navigate('OrderForm');

      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
        console.log('Login Failed:', data);
        setLoading(false); // Hide loader
      }
    } catch (error) {
      console.error(error);
      console.log('Login Failed:', data);
      Alert.alert('Error', 'Something went wrong while logging in');
      setLoading(false); // Hide loader
    } finally {
      setLoading(false); // Hide loader
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Application Login</Text>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <Button title="Login" onPress={handleSubmit} disabled={loading} />
            {loading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Don't have an account? Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  error: { color: 'red', marginBottom: 10 },
  link: { color: 'blue', marginTop: 15, textAlign: 'center' },
});
