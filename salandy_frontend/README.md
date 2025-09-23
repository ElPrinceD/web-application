# Salandy Frontend

A React Native/Expo mobile app for a service marketplace with emergency services integration.

## Features

### Core Features
- **Authentication System**: Login/Register with JWT token management
- **Service Marketplace**: Request and provide services with quote system
- **Emergency Services**: Emergency request creation with live chat
- **Real-time Chat**: WebSocket integration for messaging
- **User Roles**: Customer, Service Provider, Emergency Operator

### Service Categories
- **Home Services**: Plumbing, Electrical, HVAC, Cleaning, Pest Control
- **Personal Care**: Nanny/Babysitting, Elderly Care, Pet Care, Tutoring
- **Professional Services**: Legal, Accounting, Consulting, Design

### Emergency Types
- **Police**: Report crimes and suspicious activity
- **Fire Department**: Fire and medical emergencies
- **Medical Emergency**: Medical emergencies requiring immediate attention

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack & Bottom Tabs)
- **State Management**: Redux Toolkit with Redux Persist
- **UI Library**: React Native Paper (Material Design)
- **HTTP Client**: Axios
- **WebSocket**: Socket.io-client
- **Storage**: AsyncStorage
- **Maps**: React Native Maps
- **Notifications**: React Native Push Notification

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (LoadingScreen, etc.)
│   └── forms/          # Form components
├── constants/          # App constants, colors, themes
├── navigation/         # Navigation configuration
├── screens/           # App screens
│   ├── auth/          # Authentication screens
│   ├── main/          # Main tab screens
│   ├── services/      # Service-related screens
│   ├── emergency/     # Emergency screens
│   ├── chat/          # Chat screens
│   └── profile/       # Profile screens
├── services/          # API and external services
│   ├── api/           # API service layer
│   ├── websocket/     # WebSocket service
│   └── notifications/ # Push notifications
├── store/             # Redux store and slices
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## API Integration

### Base URL
```
http://localhost:8000/api/
```

### Key Endpoints
- `POST /api/auth/token/` - Login
- `POST /api/users/register/` - Register
- `GET /api/users/profile/` - User profile
- `POST /api/requests/requests/` - Create service request
- `GET /api/requests/requests/` - List service requests
- `POST /api/requests/quotes/` - Submit quote
- `POST /api/emergency/requests/` - Create emergency request

### WebSocket Endpoints
- `ws://localhost:8000/ws/chat/{room_id}/` - Chat room
- `ws://localhost:8000/ws/emergency/{session_id}/` - Emergency chat

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd salandy_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on device/simulator:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory:
```
API_BASE_URL=http://localhost:8000/api
WS_BASE_URL=ws://localhost:8000/ws
```

### App Configuration
Update `app.json` for:
- App name and slug
- Bundle identifiers
- Permissions
- Icons and splash screen

## Features Implementation Status

### ✅ Completed
- [x] Project setup with Expo and TypeScript
- [x] Navigation structure (Stack + Bottom Tabs)
- [x] Redux store with authentication, services, chat, emergency slices
- [x] Authentication screens (Login, Register, Forgot Password, Verify Email)
- [x] Main screens (Home, Services, Emergency, Chat, Profile)
- [x] API service layer with JWT token management
- [x] WebSocket service for real-time communication
- [x] React Native Paper theme and styling

### 🚧 In Progress
- [ ] Service request creation and management
- [ ] Provider discovery and quote system
- [ ] Emergency chat implementation
- [ ] Real-time messaging
- [ ] Location services integration
- [ ] Push notifications
- [ ] Image/video upload functionality

### 📋 TODO
- [ ] Payment integration (Stripe)
- [ ] Rating and review system
- [ ] Advanced search and filtering
- [ ] Offline support
- [ ] Testing (Unit, Integration, E2E)
- [ ] Performance optimization
- [ ] App store deployment

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling
- Add loading states for async operations

### State Management
- Use Redux Toolkit for global state
- Keep local state minimal
- Use selectors for computed values
- Implement proper error handling in slices

### Navigation
- Use typed navigation
- Implement proper screen transitions
- Handle deep linking
- Manage navigation state properly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.


