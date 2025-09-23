import { io, Socket } from 'socket.io-client';
import { WS_BASE_URL } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants';

class WebSocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  // Event listeners
  private eventListeners: { [event: string]: Function[] } = {};

  async connect(roomId?: string, sessionId?: string) {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Determine the endpoint based on the type
      let endpoint = WS_BASE_URL;
      if (roomId) {
        endpoint += `/chat/${roomId}/`;
      } else if (sessionId) {
        endpoint += `/emergency/${sessionId}/`;
      }

      this.socket = io(endpoint, {
        auth: {
          token,
        },
        transports: ['websocket'],
        timeout: 20000,
      });

      this.setupEventListeners();
    } catch (error) {
      console.error('WebSocket connection error:', error);
      throw error;
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.emit('connected');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      this.isConnected = false;
      this.emit('disconnected', reason);
      
      // Attempt to reconnect if not manually disconnected
      if (reason !== 'io client disconnect') {
        this.attemptReconnect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.emit('error', error);
      this.attemptReconnect();
    });

    // Message events
    this.socket.on('message', (data) => {
      this.emit('message', data);
    });

    this.socket.on('message_sent', (data) => {
      this.emit('message_sent', data);
    });

    this.socket.on('typing', (data) => {
      this.emit('typing', data);
    });

    this.socket.on('stop_typing', (data) => {
      this.emit('stop_typing', data);
    });

    // Emergency specific events
    this.socket.on('emergency_assigned', (data) => {
      this.emit('emergency_assigned', data);
    });

    this.socket.on('emergency_status_update', (data) => {
      this.emit('emergency_status_update', data);
    });

    // Service request events
    this.socket.on('quote_received', (data) => {
      this.emit('quote_received', data);
    });

    this.socket.on('quote_accepted', (data) => {
      this.emit('quote_accepted', data);
    });

    this.socket.on('request_status_update', (data) => {
      this.emit('request_status_update', data);
    });

    // Notification events
    this.socket.on('notification', (data) => {
      this.emit('notification', data);
    });
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnection attempts reached');
      this.emit('reconnect_failed');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`);

    setTimeout(() => {
      if (this.socket && !this.isConnected) {
        this.socket.connect();
      }
    }, delay);
  }

  // Send message
  sendMessage(content: string, type: string = 'text', metadata?: any) {
    if (!this.socket || !this.isConnected) {
      throw new Error('WebSocket not connected');
    }

    this.socket.emit('send_message', {
      content,
      type,
      metadata,
      timestamp: new Date().toISOString(),
    });
  }

  // Send typing indicator
  sendTyping() {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('typing');
  }

  // Stop typing indicator
  stopTyping() {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('stop_typing');
  }

  // Join room
  joinRoom(roomId: string) {
    if (!this.socket || !this.isConnected) {
      throw new Error('WebSocket not connected');
    }

    this.socket.emit('join_room', { roomId });
  }

  // Leave room
  leaveRoom(roomId: string) {
    if (!this.socket || !this.isConnected) return;

    this.socket.emit('leave_room', { roomId });
  }

  // Emergency specific methods
  sendEmergencyUpdate(data: any) {
    if (!this.socket || !this.isConnected) {
      throw new Error('WebSocket not connected');
    }

    this.socket.emit('emergency_update', data);
  }

  // Event listener management
  on(event: string, callback: Function) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  off(event: string, callback: Function) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
    }
  }

  private emit(event: string, data?: any) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach(callback => callback(data));
    }
  }

  // Disconnect
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.eventListeners = {};
    }
  }

  // Get connection status
  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  // Get socket instance (for advanced usage)
  getSocket(): Socket | null {
    return this.socket;
  }
}

export const webSocketService = new WebSocketService();
export default webSocketService;


