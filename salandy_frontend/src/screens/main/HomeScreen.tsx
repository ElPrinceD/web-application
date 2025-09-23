import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Button, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { fetchServiceCategories } from '../../store/slices/servicesSlice';
import { RootStackParamList } from '../../types';
import { COLORS, SERVICE_CATEGORIES, EMERGENCY_TYPES } from '../../constants';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { categories, isLoading } = useSelector((state: RootState) => state.services);

  useEffect(() => {
    dispatch(fetchServiceCategories());
  }, [dispatch]);

  const handleEmergencyPress = () => {
    // Navigate to emergency screen
    navigation.navigate('Main' as any);
  };

  const handleServiceCategoryPress = (categoryId: string) => {
    // Navigate to services screen with selected category
    navigation.navigate('Main' as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Title style={styles.welcomeText}>
            Welcome back, {user?.firstName}!
          </Title>
          <Paragraph style={styles.subtitle}>
            How can we help you today?
          </Paragraph>
        </View>

        {/* Emergency Section */}
        <Card style={[styles.card, styles.emergencyCard]}>
          <Card.Content>
            <Title style={styles.emergencyTitle}>Emergency Services</Title>
            <Paragraph style={styles.emergencySubtitle}>
              Need immediate help? Contact emergency services
            </Paragraph>
            <Button
              mode="contained"
              onPress={handleEmergencyPress}
              style={styles.emergencyButton}
              buttonColor={COLORS.secondary}
            >
              Emergency Help
            </Button>
          </Card.Content>
        </Card>

        {/* Service Categories */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Service Categories</Title>
          {SERVICE_CATEGORIES.map((category) => (
            <Card
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleServiceCategoryPress(category.id)}
            >
              <Card.Content style={styles.categoryContent}>
                <View style={styles.categoryInfo}>
                  <Title style={styles.categoryTitle}>{category.name}</Title>
                  <Paragraph style={styles.categoryDescription}>
                    {category.description}
                  </Paragraph>
                </View>
                <Button mode="outlined" compact>
                  Browse
                </Button>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Quick Actions</Title>
          <View style={styles.quickActions}>
            <Card style={styles.actionCard}>
              <Card.Content>
                <Title style={styles.actionTitle}>Request Service</Title>
                <Paragraph style={styles.actionDescription}>
                  Create a new service request
                </Paragraph>
                <Button mode="contained" compact>
                  Create Request
                </Button>
              </Card.Content>
            </Card>

            <Card style={styles.actionCard}>
              <Card.Content>
                <Title style={styles.actionTitle}>My Bookings</Title>
                <Paragraph style={styles.actionDescription}>
                  View your service bookings
                </Paragraph>
                <Button mode="outlined" compact>
                  View Bookings
                </Button>
              </Card.Content>
            </Card>
          </View>
        </View>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          // Navigate to create service request
          navigation.navigate('Main' as any);
        }}
      />
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
    padding: 20,
    paddingTop: 40,
    backgroundColor: COLORS.primary,
  },
  welcomeText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 16,
    opacity: 0.9,
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  emergencyCard: {
    backgroundColor: COLORS.secondary,
  },
  emergencyTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  emergencySubtitle: {
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: 16,
  },
  emergencyButton: {
    backgroundColor: COLORS.white,
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
    color: COLORS.dark,
  },
  categoryCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
  },
  categoryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  categoryDescription: {
    color: COLORS.gray,
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    marginHorizontal: 16,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    elevation: 2,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  actionDescription: {
    color: COLORS.gray,
    fontSize: 14,
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
  },
});

export default HomeScreen;


