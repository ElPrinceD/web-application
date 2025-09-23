import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootState, AppDispatch } from '../../store';
import { forgotPassword } from '../../store/slices/authSlice';
import { AuthStackParamList } from '../../types';
import { COLORS, VALIDATION } from '../../constants';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!VALIDATION.EMAIL_REGEX.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      await dispatch(forgotPassword(email)).unwrap();
      Alert.alert(
        'Email Sent',
        'Please check your email for password reset instructions.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', error as string);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Forgot Password</Title>
            <Paragraph style={styles.subtitle}>
              Enter your email address and we'll send you instructions to reset your password.
            </Paragraph>

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              error={!!error}
            />

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleForgotPassword}
              loading={isLoading}
              disabled={isLoading}
              style={styles.resetButton}
            >
              Send Reset Instructions
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              style={styles.backButton}
            >
              Back to Login
            </Button>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  resetButton: {
    marginTop: 16,
    marginBottom: 16,
  },
  backButton: {
    marginBottom: 8,
  },
});

export default ForgotPasswordScreen;


