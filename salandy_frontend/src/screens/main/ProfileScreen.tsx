import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Avatar, List, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootState, AppDispatch } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { RootStackParamList } from '../../types';
import { COLORS, USER_ROLES } from '../../constants';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case USER_ROLES.CUSTOMER:
        return 'Customer';
      case USER_ROLES.SERVICE_PROVIDER:
        return 'Service Provider';
      case USER_ROLES.EMERGENCY_OPERATOR:
        return 'Emergency Operator';
      default:
        return 'User';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Avatar.Text
            size={80}
            label={user ? getInitials(user.firstName, user.lastName) : 'U'}
            style={styles.avatar}
          />
          <Title style={styles.userName}>
            {user ? `${user.firstName} ${user.lastName}` : 'User'}
          </Title>
          <Paragraph style={styles.userEmail}>
            {user?.email}
          </Paragraph>
          <Paragraph style={styles.userRole}>
            {user ? getRoleDisplayName(user.role) : 'User'}
          </Paragraph>
        </View>

        {/* Profile Actions */}
        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="Edit Profile"
              description="Update your personal information"
              left={(props) => <List.Icon {...props} icon="account-edit" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                // TODO: Navigate to edit profile
                Alert.alert('Coming Soon', 'Edit profile feature will be available soon');
              }}
            />
            <Divider />
            <List.Item
              title="Settings"
              description="App preferences and notifications"
              left={(props) => <List.Icon {...props} icon="cog" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                // TODO: Navigate to settings
                Alert.alert('Coming Soon', 'Settings feature will be available soon');
              }}
            />
            <Divider />
            <List.Item
              title="Payment Methods"
              description="Manage your payment information"
              left={(props) => <List.Icon {...props} icon="credit-card" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                // TODO: Navigate to payment methods
                Alert.alert('Coming Soon', 'Payment methods feature will be available soon');
              }}
            />
          </Card.Content>
        </Card>

        {/* Service Provider Section */}
        {user?.role === USER_ROLES.SERVICE_PROVIDER && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Service Provider</Title>
              <List.Item
                title="My Services"
                description="Manage your service offerings"
                left={(props) => <List.Icon {...props} icon="briefcase" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {
                  // TODO: Navigate to my services
                  Alert.alert('Coming Soon', 'My services feature will be available soon');
                }}
              />
              <Divider />
              <List.Item
                title="Availability"
                description="Set your working hours"
                left={(props) => <List.Icon {...props} icon="calendar-clock" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {
                  // TODO: Navigate to availability
                  Alert.alert('Coming Soon', 'Availability feature will be available soon');
                }}
              />
              <Divider />
              <List.Item
                title="Earnings"
                description="View your earnings and payments"
                left={(props) => <List.Icon {...props} icon="currency-usd" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {
                  // TODO: Navigate to earnings
                  Alert.alert('Coming Soon', 'Earnings feature will be available soon');
                }}
              />
            </Card.Content>
          </Card>
        )}

        {/* Customer Section */}
        {user?.role === USER_ROLES.CUSTOMER && (
          <Card style={styles.card}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Customer</Title>
              <List.Item
                title="My Requests"
                description="View your service requests"
                left={(props) => <List.Icon {...props} icon="file-document" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {
                  // TODO: Navigate to my requests
                  Alert.alert('Coming Soon', 'My requests feature will be available soon');
                }}
              />
              <Divider />
              <List.Item
                title="Bookings"
                description="Manage your service bookings"
                left={(props) => <List.Icon {...props} icon="calendar-check" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {
                  // TODO: Navigate to bookings
                  Alert.alert('Coming Soon', 'Bookings feature will be available soon');
                }}
              />
              <Divider />
              <List.Item
                title="Reviews"
                description="Rate and review services"
                left={(props) => <List.Icon {...props} icon="star" />}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {
                  // TODO: Navigate to reviews
                  Alert.alert('Coming Soon', 'Reviews feature will be available soon');
                }}
              />
            </Card.Content>
          </Card>
        )}

        {/* Support Section */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Support</Title>
            <List.Item
              title="Help Center"
              description="Get help and support"
              left={(props) => <List.Icon {...props} icon="help-circle" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                // TODO: Navigate to help center
                Alert.alert('Coming Soon', 'Help center feature will be available soon');
              }}
            />
            <Divider />
            <List.Item
              title="Contact Us"
              description="Get in touch with our team"
              left={(props) => <List.Icon {...props} icon="email" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                // TODO: Navigate to contact us
                Alert.alert('Coming Soon', 'Contact us feature will be available soon');
              }}
            />
            <Divider />
            <List.Item
              title="Terms & Privacy"
              description="Legal information"
              left={(props) => <List.Icon {...props} icon="file-document-outline" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {
                // TODO: Navigate to terms and privacy
                Alert.alert('Coming Soon', 'Terms and privacy feature will be available soon');
              }}
            />
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Card style={styles.card}>
          <Card.Content>
            <Button
              mode="contained"
              onPress={handleLogout}
              style={styles.logoutButton}
              buttonColor={COLORS.error}
            >
              Logout
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: COLORS.white,
    marginBottom: 16,
  },
  userName: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  userRole: {
    color: COLORS.white,
    opacity: 0.8,
    fontSize: 14,
  },
  card: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 8,
  },
});

export default ProfileScreen;


