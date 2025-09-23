// API Configuration
export const API_BASE_URL = 'http://localhost:8000/api';
export const WS_BASE_URL = 'ws://localhost:8000/ws';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/token/',
  REGISTER: '/users/register/',
  REFRESH_TOKEN: '/auth/refresh/',
  FORGOT_PASSWORD: '/auth/forgot-password/',
  RESET_PASSWORD: '/auth/reset-password/',
  VERIFY_EMAIL: '/auth/verify-email/',
  
  // User
  PROFILE: '/users/profile/',
  UPDATE_PROFILE: '/users/profile/',
  
  // Services
  SERVICE_CATEGORIES: '/services/categories/',
  SERVICE_REQUESTS: '/requests/requests/',
  CREATE_REQUEST: '/requests/requests/',
  QUOTES: '/requests/quotes/',
  SUBMIT_QUOTE: '/requests/quotes/',
  PROVIDERS: '/providers/',
  
  // Emergency
  EMERGENCY_REQUESTS: '/emergency/requests/',
  CREATE_EMERGENCY: '/emergency/requests/',
  
  // Chat
  CHAT_ROOMS: '/chat/rooms/',
  MESSAGES: '/chat/messages/',
} as const;

// WebSocket Endpoints
export const WS_ENDPOINTS = {
  CHAT: (roomId: string) => `/chat/${roomId}/`,
  EMERGENCY: (sessionId: string) => `/emergency/${sessionId}/`,
} as const;

// Service Categories
export const SERVICE_CATEGORIES = [
  {
    id: 'home_services',
    name: 'Home Services',
    icon: 'home',
    subcategories: [
      { id: 'plumbing', name: 'Plumbing', icon: 'pipe' },
      { id: 'electrical', name: 'Electrical', icon: 'flash' },
      { id: 'hvac', name: 'HVAC', icon: 'thermometer' },
      { id: 'cleaning', name: 'Cleaning', icon: 'broom' },
      { id: 'pest_control', name: 'Pest Control', icon: 'bug' },
    ],
  },
  {
    id: 'personal_care',
    name: 'Personal Care',
    icon: 'person',
    subcategories: [
      { id: 'nanny', name: 'Nanny/Babysitting', icon: 'baby' },
      { id: 'elderly_care', name: 'Elderly Care', icon: 'elderly' },
      { id: 'pet_care', name: 'Pet Care', icon: 'paw' },
      { id: 'tutoring', name: 'Tutoring', icon: 'book' },
    ],
  },
  {
    id: 'professional_services',
    name: 'Professional Services',
    icon: 'briefcase',
    subcategories: [
      { id: 'legal', name: 'Legal Services', icon: 'gavel' },
      { id: 'accounting', name: 'Accounting', icon: 'calculator' },
      { id: 'consulting', name: 'Consulting', icon: 'lightbulb' },
      { id: 'design', name: 'Design', icon: 'palette' },
    ],
  },
] as const;

// Emergency Types
export const EMERGENCY_TYPES = [
  {
    id: 'police',
    name: 'Police',
    icon: 'shield',
    color: '#2196F3',
    description: 'Report crimes, suspicious activity, or request police assistance',
  },
  {
    id: 'fire',
    name: 'Fire Department',
    icon: 'fire',
    color: '#FF5722',
    description: 'Fire emergencies, medical emergencies, or rescue services',
  },
  {
    id: 'medical',
    name: 'Medical Emergency',
    icon: 'medical-bag',
    color: '#4CAF50',
    description: 'Medical emergencies requiring immediate attention',
  },
] as const;

// App Colors
export const COLORS = {
  primary: '#2196F3',
  secondary: '#FF5722',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  light: '#F5F5F5',
  dark: '#212121',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#E0E0E0',
} as const;

// Request Status
export const REQUEST_STATUS = {
  PENDING: 'pending',
  QUOTED: 'quoted',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

// Emergency Priority
export const EMERGENCY_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

// Message Types
export const MESSAGE_TYPES = {
  TEXT: 'text',
  IMAGE: 'image',
  LOCATION: 'location',
  FILE: 'file',
} as const;

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  SERVICE_PROVIDER: 'service_provider',
  EMERGENCY_OPERATOR: 'emergency_operator',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  SETTINGS: 'settings',
} as const;

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'Salandy',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@salandy.com',
  PRIVACY_POLICY_URL: 'https://salandy.com/privacy',
  TERMS_OF_SERVICE_URL: 'https://salandy.com/terms',
} as const;


