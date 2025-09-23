import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, MainTabParamList } from '../types';
import { COLORS } from '../constants';

// Import screens
import HomeScreen from '../screens/main/HomeScreen';
import ServicesScreen from '../screens/main/ServicesScreen';
import EmergencyScreen from '../screens/main/EmergencyScreen';
import ChatScreen from '../screens/main/ChatScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

// Import modal screens
import ServiceRequestScreen from '../screens/services/ServiceRequestScreen';
import EmergencyChatScreen from '../screens/emergency/EmergencyChatScreen';
import ChatRoomScreen from '../screens/chat/ChatRoomScreen';
import ProviderProfileScreen from '../screens/services/ProviderProfileScreen';
import BookingDetailsScreen from '../screens/services/BookingDetailsScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Services') {
            iconName = focused ? 'construct' : 'construct-outline';
          } else if (route.name === 'Emergency') {
            iconName = focused ? 'warning' : 'warning-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.lightGray,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Services" 
        component={ServicesScreen}
        options={{ tabBarLabel: 'Services' }}
      />
      <Tab.Screen 
        name="Emergency" 
        component={EmergencyScreen}
        options={{ tabBarLabel: 'Emergency' }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{ tabBarLabel: 'Chat' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen 
        name="ServiceRequest" 
        component={ServiceRequestScreen}
        options={{
          headerShown: true,
          title: 'Service Request',
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen 
        name="EmergencyChat" 
        component={EmergencyChatScreen}
        options={{
          headerShown: true,
          title: 'Emergency Chat',
          headerStyle: { backgroundColor: COLORS.secondary },
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen}
        options={{
          headerShown: true,
          title: 'Chat',
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen 
        name="ProviderProfile" 
        component={ProviderProfileScreen}
        options={{
          headerShown: true,
          title: 'Provider Profile',
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
        }}
      />
      <Stack.Screen 
        name="BookingDetails" 
        component={BookingDetailsScreen}
        options={{
          headerShown: true,
          title: 'Booking Details',
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;


