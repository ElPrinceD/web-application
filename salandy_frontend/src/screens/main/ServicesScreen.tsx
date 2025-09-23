import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Searchbar, Chip } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { fetchServiceCategories, fetchServiceRequests, setSelectedCategory } from '../../store/slices/servicesSlice';
import { COLORS, SERVICE_CATEGORIES } from '../../constants';

const ServicesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, requests, selectedCategory, isLoading } = useSelector((state: RootState) => state.services);

  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    dispatch(fetchServiceCategories());
    dispatch(fetchServiceRequests());
  }, [dispatch]);

  const handleCategorySelect = (categoryId: string) => {
    dispatch(setSelectedCategory(categoryId));
    // Filter requests by category
    dispatch(fetchServiceRequests({ categoryId }));
  };

  const renderCategoryChip = ({ item }: { item: any }) => (
    <Chip
      selected={selectedCategory === item.id}
      onPress={() => handleCategorySelect(item.id)}
      style={[
        styles.chip,
        selectedCategory === item.id && styles.selectedChip
      ]}
      textStyle={[
        styles.chipText,
        selectedCategory === item.id && styles.selectedChipText
      ]}
    >
      {item.name}
    </Chip>
  );

  const renderServiceRequest = ({ item }: { item: any }) => (
    <Card style={styles.requestCard}>
      <Card.Content>
        <Title style={styles.requestTitle}>{item.title}</Title>
        <Paragraph style={styles.requestDescription} numberOfLines={2}>
          {item.description}
        </Paragraph>
        <View style={styles.requestDetails}>
          <Text style={styles.requestBudget}>Budget: ${item.budget}</Text>
          <Text style={styles.requestDate}>
            {new Date(item.scheduledDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.requestActions}>
          <Button mode="outlined" compact>
            View Details
          </Button>
          <Button mode="contained" compact>
            Submit Quote
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Services</Title>
        <Searchbar
          placeholder="Search services..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      <ScrollView style={styles.content}>
        {/* Categories */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Categories</Title>
          <FlatList
            data={SERVICE_CATEGORIES}
            renderItem={renderCategoryChip}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContainer}
          />
        </View>

        {/* Service Requests */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>
            {selectedCategory ? 'Filtered Requests' : 'All Requests'}
          </Title>
          <FlatList
            data={requests}
            renderItem={renderServiceRequest}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.requestsContainer}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchbar: {
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
    color: COLORS.dark,
  },
  chipsContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    marginRight: 8,
    backgroundColor: COLORS.white,
  },
  selectedChip: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    color: COLORS.dark,
  },
  selectedChipText: {
    color: COLORS.white,
  },
  requestsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  requestCard: {
    marginBottom: 12,
    elevation: 2,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  requestDescription: {
    color: COLORS.gray,
    marginTop: 4,
    marginBottom: 8,
  },
  requestDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  requestBudget: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  requestDate: {
    color: COLORS.gray,
  },
  requestActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
});

export default ServicesScreen;


