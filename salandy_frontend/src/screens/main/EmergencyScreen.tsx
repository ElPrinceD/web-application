import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Title, Paragraph, Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import { RootState, AppDispatch } from '../../store';
import { createEmergencyRequest } from '../../store/slices/emergencySlice';
import { RootStackParamList } from '../../types';
import { COLORS, EMERGENCY_TYPES } from '../../constants';

type EmergencyScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const EmergencyScreen: React.FC = () => {
  const navigation = useNavigation<EmergencyScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.emergency);

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [description, setDescription] = useState('');

  const handleEmergencyTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleCreateEmergencyRequest = async () => {
    if (!selectedType) {
      Alert.alert('Error', 'Please select an emergency type');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Please provide a description of the emergency');
      return;
    }

    try {
      const emergencyData = {
        type: selectedType as 'police' | 'fire' | 'medical',
        priority: 'high' as const,
        description: description.trim(),
        location: {
          latitude: 37.7749, // TODO: Get actual location
          longitude: -122.4194,
          address: 'Current Location', // TODO: Get actual address
        },
      };

      await dispatch(createEmergencyRequest(emergencyData)).unwrap();
      
      Alert.alert(
        'Emergency Request Created',
        'Your emergency request has been submitted. Help is on the way.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to emergency chat
              navigation.navigate('EmergencyChat' as any, { sessionId: 'temp-session-id' });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create emergency request. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Title style={styles.headerTitle}>Emergency Services</Title>
          <Paragraph style={styles.headerSubtitle}>
            Select the type of emergency and provide details
          </Paragraph>
        </View>

        {/* Emergency Types */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Emergency Type</Title>
          {EMERGENCY_TYPES.map((type) => (
            <Card
              key={type.id}
              style={[
                styles.emergencyTypeCard,
                selectedType === type.id && styles.selectedCard,
                { borderLeftColor: type.color }
              ]}
              onPress={() => handleEmergencyTypeSelect(type.id)}
            >
              <Card.Content>
                <View style={styles.emergencyTypeContent}>
                  <View style={styles.emergencyTypeInfo}>
                    <Title style={styles.emergencyTypeTitle}>{type.name}</Title>
                    <Paragraph style={styles.emergencyTypeDescription}>
                      {type.description}
                    </Paragraph>
                  </View>
                  <View style={[styles.emergencyTypeIcon, { backgroundColor: type.color }]}>
                    <Text style={styles.emergencyTypeIconText}>
                      {type.icon}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Emergency Description */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Emergency Details</Title>
          <Card style={styles.descriptionCard}>
            <Card.Content>
              <TextInput
                label="Describe the emergency"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                multiline
                numberOfLines={4}
                placeholder="Please provide as much detail as possible about the emergency situation..."
                style={styles.descriptionInput}
              />
            </Card.Content>
          </Card>
        </View>

        {/* Emergency Actions */}
        <View style={styles.section}>
          <Card style={styles.actionsCard}>
            <Card.Content>
              <Button
                mode="contained"
                onPress={handleCreateEmergencyRequest}
                loading={isLoading}
                disabled={isLoading || !selectedType || !description.trim()}
                style={styles.emergencyButton}
                buttonColor={COLORS.secondary}
              >
                Request Emergency Help
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => {
                  // TODO: Implement call emergency services
                  Alert.alert('Call Emergency', 'Calling emergency services...');
                }}
                style={styles.callButton}
              >
                Call Emergency Services
              </Button>
            </Card.Content>
          </Card>
        </View>

        {/* Emergency Tips */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle}>Emergency Tips</Title>
          <Card style={styles.tipsCard}>
            <Card.Content>
              <Paragraph style={styles.tipText}>
                • Stay calm and provide clear information
              </Paragraph>
              <Paragraph style={styles.tipText}>
                • Provide your exact location if possible
              </Paragraph>
              <Paragraph style={styles.tipText}>
                • Follow instructions from emergency operators
              </Paragraph>
              <Paragraph style={styles.tipText}>
                • Keep your phone charged and accessible
              </Paragraph>
            </Card.Content>
          </Card>
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
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.secondary,
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: COLORS.white,
    opacity: 0.9,
    marginTop: 8,
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
  emergencyTypeCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
    borderLeftWidth: 4,
  },
  selectedCard: {
    backgroundColor: COLORS.lightGray,
  },
  emergencyTypeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emergencyTypeInfo: {
    flex: 1,
  },
  emergencyTypeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  emergencyTypeDescription: {
    color: COLORS.gray,
    marginTop: 4,
  },
  emergencyTypeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyTypeIconText: {
    color: COLORS.white,
    fontSize: 24,
  },
  descriptionCard: {
    marginHorizontal: 16,
    elevation: 2,
  },
  descriptionInput: {
    backgroundColor: COLORS.white,
  },
  actionsCard: {
    marginHorizontal: 16,
    elevation: 2,
  },
  emergencyButton: {
    marginBottom: 12,
  },
  callButton: {
    borderColor: COLORS.secondary,
  },
  tipsCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    elevation: 2,
  },
  tipText: {
    color: COLORS.dark,
    marginBottom: 8,
  },
});

export default EmergencyScreen;


