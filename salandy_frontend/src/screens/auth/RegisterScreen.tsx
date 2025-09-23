import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Card, Title, Paragraph, RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootState, AppDispatch } from '../../store';
import { registerUser } from '../../store/slices/authSlice';
import { AuthStackParamList } from '../../types';
import { COLORS, VALIDATION, USER_ROLES } from '../../constants';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: USER_ROLES.CUSTOMER,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleRegister = async () => {
    const { email, password, confirmPassword, firstName, lastName, phone, role } = formData;

    if (!email || !password || !confirmPassword || !firstName || !lastName || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!VALIDATION.EMAIL_REGEX.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      Alert.alert('Error', `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters long`);
      return;
    }

    if (firstName.length < VALIDATION.NAME_MIN_LENGTH || lastName.length < VALIDATION.NAME_MIN_LENGTH) {
      Alert.alert('Error', `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters long`);
      return;
    }

    try {
      await dispatch(registerUser({
        email,
        password,
        firstName,
        lastName,
        phone,
        role,
      })).unwrap();
    } catch (error) {
      Alert.alert('Registration Failed', error as string);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Create Account</Title>
            <Paragraph style={styles.subtitle}>
              Join Salandy and start using our services
            </Paragraph>

            <TextInput
              label="First Name"
              value={formData.firstName}
              onChangeText={(value) => updateFormData('firstName', value)}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Last Name"
              value={formData.lastName}
              onChangeText={(value) => updateFormData('lastName', value)}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <TextInput
              label="Phone Number"
              value={formData.phone}
              onChangeText={(value) => updateFormData('phone', value)}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
            />

            <TextInput
              label="Password"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              mode="outlined"
              secureTextEntry={!showPassword}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <TextInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              mode="outlined"
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />

            <View style={styles.roleContainer}>
              <Text style={styles.roleLabel}>I want to:</Text>
              <RadioButton.Group
                onValueChange={(value) => updateFormData('role', value)}
                value={formData.role}
              >
                <View style={styles.radioItem}>
                  <RadioButton value={USER_ROLES.CUSTOMER} />
                  <Text style={styles.radioLabel}>Request services</Text>
                </View>
                <View style={styles.radioItem}>
                  <RadioButton value={USER_ROLES.SERVICE_PROVIDER} />
                  <Text style={styles.radioLabel}>Provide services</Text>
                </View>
              </RadioButton.Group>
            </View>

            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={isLoading}
              disabled={isLoading}
              style={styles.registerButton}
            >
              Create Account
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}
            >
              Already have an account? Login
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
    padding: 20,
    paddingTop: 40,
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
  roleContainer: {
    marginBottom: 16,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.dark,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.dark,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  registerButton: {
    marginTop: 16,
    marginBottom: 16,
  },
  loginButton: {
    marginBottom: 8,
  },
});

export default RegisterScreen;


