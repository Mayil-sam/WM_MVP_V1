import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';

export default function OrderFormScreen({ navigation }) {
  const [showOrderDate, setShowOrderDate] = useState(false);
  const [showChequeDate, setShowChequeDate] = useState(false);

  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Alice' },
    { id: 3, name: 'Michael' },
  ];

  const validationSchema = Yup.object().shape({
    order_date: Yup.date().required('Required'),
    delivery_order_number: Yup.string().required('Required'),
    repair_order_number: Yup.string().required('Required'),
    work_descTest: Yup.string().required('Required'),
    amount: Yup.number().required('Required'),
    done_by_user_id: Yup.string().required('Required'),
    lpo_number: Yup.string().required('Required'),
    rlpo: Yup.string().required('Required'),
    cheque_number: Yup.string().required('Required'),
    cheque_date: Yup.date().required('Required'),
    cheque_amount: Yup.number().required('Required'),
  });

  return (
    <Formik
      initialValues={{
        order_date: new Date(),
        delivery_order_number: '',
        repair_order_number: '',
        work_descTest: '',
        amount: '',
        done_by_user_id: '',
        lpo_number: '',
        rlpo: '',
        cheque_number: '',
        cheque_date: new Date(),
        cheque_amount: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form submitted:', values);
        navigation.navigate('OrderConfirmation', { formData: values });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <View style={styles.containerwithbottommargin}>
          <Text style={styles.label}>Order Date</Text>
          <Button title={values.order_date.toDateString()} onPress={() => setShowOrderDate(true)} />
          {showOrderDate && (
            <DateTimePicker
              value={values.order_date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowOrderDate(false);
                if (selectedDate) setFieldValue('order_date', selectedDate);
              }}
            />
          )}

          <TextInput
            placeholder="Delivery Order Number"
            style={styles.input}
            onChangeText={handleChange('delivery_order_number')}
            value={values.delivery_order_number}
          />

          <TextInput
            placeholder="Repair Order Number"
            style={styles.input}
            onChangeText={handleChange('repair_order_number')}
            value={values.repair_order_number}
          />

          <TextInput
            placeholder="Work Description"
            style={styles.input}
            onChangeText={handleChange('work_descTest')}
            value={values.work_descTest}
          />

          <TextInput
            placeholder="Amount"
            style={styles.input}
            keyboardType="decimal-pad"
            onChangeText={handleChange('amount')}
            value={values.amount}
          />

          <Text style={styles.label}>Done By (User)</Text>
          {Platform.OS === 'web' ? (
            <select
              style={styles.input}
              value={values.done_by_user_id}
              onChange={(e) => setFieldValue('done_by_user_id', e.target.value)}
            >
              <option value="">Select User</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          ) : (
            <Picker
              selectedValue={values.done_by_user_id}
              onValueChange={(val) => setFieldValue('done_by_user_id', val)}
              style={styles.input}
            >
              <Picker.Item label="Select User" value="" />
              {users.map((u) => (
                <Picker.Item key={u.id} label={u.name} value={u.id.toString()} />
              ))}
            </Picker>
          )}

          <TextInput
            placeholder="LPO Number"
            style={styles.input}
            onChangeText={handleChange('lpo_number')}
            value={values.lpo_number}
          />

          <TextInput
            placeholder="RLPO"
            style={styles.input}
            onChangeText={handleChange('rlpo')}
            value={values.rlpo}
          />

          <TextInput
            placeholder="Cheque Number"
            style={styles.input}
            onChangeText={handleChange('cheque_number')}
            value={values.cheque_number}
          />

          <Text style={styles.label}>Cheque Date</Text>
          <Button title={values.cheque_date.toDateString()} onPress={() => setShowChequeDate(true)} />
          {showChequeDate && (
            <DateTimePicker
              value={values.cheque_date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowChequeDate(false);
                if (selectedDate) setFieldValue('cheque_date', selectedDate);
              }}
            />
          )}

          <TextInput
            placeholder="Cheque Amount"
            style={styles.input}
            keyboardType="decimal-pad"
            onChangeText={handleChange('cheque_amount')}
            value={values.cheque_amount}
          />

          <Button title="Continue" onPress={handleSubmit}
          
           />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20},
  containerwithbottommargin: { padding: 20, marginBottom: 20 },
  label: { marginTop: 15, marginBottom: 5, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});
