import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';


const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string()
        .matches(/^\d{8}$/, 'Mobile number must be 8 digits')
        .required('Mobile number is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Too short').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm your password'),
});

export default function RegisterScreen() {
    const [loading, setLoading] = useState(false);
    const handleRegister = async (values) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    username: values.username,
                    password: values.password,
                    full_name: values.firstName + " " + values.lastName,
                    mobile_number: values.mobile,
                    email: values.email

                }),
            });

            const data = await response.json();

            if (data.issuccess === true) {
                console.log('Register successful:', data);
                setLoading(false); // Hide loader
                Toast.show({
                    type: 'success',
                    text1: 'Registration Successful',
                    text2: 'You can now login',
                    position: 'top'
                });

                setTimeout(() => {
                    navigation.navigate('Login');
                }, 3000);
                //Alert.alert('Registration Successful', 'You can now login.');
                navigation.navigate('Login');

            } else {
                console.log('Register unsuccessful:', data);
                setLoading(false); // Hide loader
                Alert.alert('Registration Failed', data.message || 'Please try again');
            }
        } catch (error) {
            setLoading(false); // Hide loader
            console.error(error);
            Alert.alert('Error', 'Could not register. Please try again later.');
        }
        finally {
            setLoading(false); // Hide loader
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <TextInput style={styles.input} placeholder="First Name" onChangeText={handleChange('firstName')} onBlur={handleBlur('firstName')} value={values.firstName} />
                        {touched.firstName && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

                        <TextInput style={styles.input} placeholder="Last Name" onChangeText={handleChange('lastName')} onBlur={handleBlur('lastName')} value={values.lastName} />
                        {touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

                        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
                        {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <TextInput style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" onChangeText={handleChange('mobile')} onBlur={handleBlur('mobile')} value={values.mobile} />
                        {touched.mobile && errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}



                        <TextInput style={styles.input} placeholder="Username" onChangeText={handleChange('username')} onBlur={handleBlur('username')} value={values.username} />
                        {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

                        <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
                        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                        <TextInput style={styles.input} placeholder="Re-enter Password" secureTextEntry onChangeText={handleChange('confirmPassword')} onBlur={handleBlur('confirmPassword')} value={values.confirmPassword} />
                        {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

                        <Button title="Submit" onPress={handleSubmit} disabled={loading} />

                        {loading && (
                            <View style={styles.loadingOverlay}>
                                <ActivityIndicator size="large" color="#ffffff" />
                            </View>
                        )}
                    </View>
                )}
            </Formik>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
    error: { color: 'red', marginBottom: 10 },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
});
