// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'customer' | 'service_provider' | 'emergency_operator';
  isVerified: boolean;
  profileImage?: string;
  location?: Location;
  rating?: number;
  reviewCount?: number;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

// Service Types
export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories?: ServiceCategory[];
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  categoryId: string;
  title: string;
  description: string;
  images: string[];
  videos?: string[];
  location: Location;
  scheduledDate: string;
  budget: number;
  status: 'pending' | 'quoted' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  quotes?: Quote[];
  acceptedQuote?: Quote;
}

export interface Quote {
  id: string;
  requestId: string;
  providerId: string;
  provider: User;
  amount: number;
  description: string;
  estimatedDuration: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface ServiceProvider {
  id: string;
  user: User;
  categories: string[];
  availability: Availability[];
  rating: number;
  reviewCount: number;
  completedJobs: number;
  isOnline: boolean;
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Emergency Types
export interface EmergencyRequest {
  id: string;
  userId: string;
  type: 'police' | 'fire' | 'medical';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: Location;
  status: 'pending' | 'assigned' | 'in_progress' | 'resolved';
  createdAt: string;
  operatorId?: string;
  chatSessionId: string;
}

// Chat Types
export interface ChatRoom {
  id: string;
  type: 'service_request' | 'emergency';
  participants: string[];
  lastMessage?: Message;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  sender: User;
  content: string;
  type: 'text' | 'image' | 'location' | 'file';
  metadata?: any;
  timestamp: string;
  isRead: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'customer' | 'service_provider';
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  ServiceRequest: { requestId: string };
  EmergencyChat: { sessionId: string };
  ChatRoom: { roomId: string };
  ProviderProfile: { providerId: string };
  BookingDetails: { bookingId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerifyEmail: { email: string };
};

export type MainTabParamList = {
  Home: undefined;
  Services: undefined;
  Emergency: undefined;
  Chat: undefined;
  Profile: undefined;
};

// Redux State Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ServicesState {
  categories: ServiceCategory[];
  requests: ServiceRequest[];
  providers: ServiceProvider[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ChatState {
  rooms: ChatRoom[];
  messages: { [roomId: string]: Message[] };
  activeRoom: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface EmergencyState {
  activeRequest: EmergencyRequest | null;
  requests: EmergencyRequest[];
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  services: ServicesState;
  chat: ChatState;
  emergency: EmergencyState;
}


