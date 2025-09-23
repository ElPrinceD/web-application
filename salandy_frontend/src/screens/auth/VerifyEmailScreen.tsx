import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { RootState, AppDispatch } from '../../store';
import { verifyEmail } from '../../store/slices/authSlice';
import { AuthStackParamList } from '../../types';
import { COLORS } from '../../constants';

type VerifyEmailScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'VerifyEmail'>;
type VerifyEmailScreenRouteProp = RouteProp<AuthStackParamList, 'VerifyEmail'>;

const VerifyEmailScreen: React.FC = () => {
  const [token, setToken] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<VerifyEmailScreenNavigationProp>();
  const route = useRoute<VerifyEmailScreenRouteProp>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const { email } = route.params;

  const handleVerifyEmail = async () => {
    if (!token) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    try {
      await dispatch(verifyEmail(token)).unwrap();
      Alert.alert(
        'Email Verified',
        'Your email has been successfully verified.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Verification Failed', error as string);
    }
  };

  const handleResendCode = () => {
    // TODO: Implement resend verification code
    Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Verify Email</Title>
            <Paragraph style={styles.subtitle}>
              We've sent a verification code to {email}. Please enter the code below to verify your email address.
            </Paragraph>

            <TextInput
              label="Verification Code"
              value={token}
              onChangeText={setToken}
              mode="outlined"
              keyboardType="number-pad"
              style={styles.input}
              error={!!error}
            />

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleVerifyEmail}
              loading={isLoading}
              disabled={isLoading}
              style={styles.verifyButton}
            >
              Verify Email
            </Button>

            <Button
              mode="text"
              onPress={handleResendCode}
              style={styles.resendButton}
            >
              Resend Code
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
  verifyButton: {
    marginTop: 16,
    marginBottom: 16,
  },
  resendButton: {
    marginBottom: 8,
  },
  backButton: {
    marginBottom: 8,
  },
});

export default VerifyEmailScreen;


