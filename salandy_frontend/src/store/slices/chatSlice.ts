import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, ChatRoom, Message } from '../../types';
import { apiService } from '../../services/api';

const initialState: ChatState = {
  rooms: [],
  messages: {},
  activeRoom: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchChatRooms = createAsyncThunk(
  'chat/fetchRooms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/chat/rooms/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch chat rooms');
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (roomId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`/chat/rooms/${roomId}/messages/`);
      return { roomId, messages: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch messages');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ roomId, content, type = 'text', metadata }: { 
    roomId: string; 
    content: string; 
    type?: string; 
    metadata?: any; 
  }, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`/chat/rooms/${roomId}/messages/`, {
        content,
        type,
        metadata,
      });
      return { roomId, message: response.data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

export const createChatRoom = createAsyncThunk(
  'chat/createRoom',
  async ({ type, participants, requestId }: { 
    type: 'service_request' | 'emergency'; 
    participants: string[]; 
    requestId?: string; 
  }, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/chat/rooms/', {
        type,
        participants,
        requestId,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create chat room');
    }
  }
);

export const markMessagesAsRead = createAsyncThunk(
  'chat/markAsRead',
  async (roomId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`/chat/rooms/${roomId}/mark-read/`);
      return { roomId, unreadCount: response.data.unreadCount };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark messages as read');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveRoom: (state, action: PayloadAction<string | null>) => {
      state.activeRoom = action.payload;
    },
    addMessage: (state, action: PayloadAction<{ roomId: string; message: Message }>) => {
      const { roomId, message } = action.payload;
      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }
      state.messages[roomId].push(message);
      
      // Update last message in room
      const room = state.rooms.find(r => r.id === roomId);
      if (room) {
        room.lastMessage = message;
        room.updatedAt = message.timestamp;
      }
    },
    updateMessage: (state, action: PayloadAction<{ roomId: string; messageId: string; updates: Partial<Message> }>) => {
      const { roomId, messageId, updates } = action.payload;
      const messages = state.messages[roomId];
      if (messages) {
        const index = messages.findIndex(msg => msg.id === messageId);
        if (index !== -1) {
          messages[index] = { ...messages[index], ...updates };
        }
      }
    },
    addRoom: (state, action: PayloadAction<ChatRoom>) => {
      state.rooms.unshift(action.payload);
    },
    updateRoom: (state, action: PayloadAction<ChatRoom>) => {
      const index = state.rooms.findIndex(room => room.id === action.payload.id);
      if (index !== -1) {
        state.rooms[index] = action.payload;
      }
    },
    clearMessages: (state, action: PayloadAction<string>) => {
      state.messages[action.payload] = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Chat Rooms
      .addCase(fetchChatRooms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChatRooms.fulfilled, (state, action: PayloadAction<ChatRoom[]>) => {
        state.isLoading = false;
        state.rooms = action.payload;
        state.error = null;
      })
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<{ roomId: string; messages: Message[] }>) => {
        state.isLoading = false;
        const { roomId, messages } = action.payload;
        state.messages[roomId] = messages;
        state.error = null;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Send Message
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<{ roomId: string; message: Message }>) => {
        state.isLoading = false;
        const { roomId, message } = action.payload;
        if (!state.messages[roomId]) {
          state.messages[roomId] = [];
        }
        state.messages[roomId].push(message);
        
        // Update last message in room
        const room = state.rooms.find(r => r.id === roomId);
        if (room) {
          room.lastMessage = message;
          room.updatedAt = message.timestamp;
        }
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Chat Room
      .addCase(createChatRoom.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createChatRoom.fulfilled, (state, action: PayloadAction<ChatRoom>) => {
        state.isLoading = false;
        state.rooms.unshift(action.payload);
        state.error = null;
      })
      .addCase(createChatRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Mark Messages as Read
      .addCase(markMessagesAsRead.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(markMessagesAsRead.fulfilled, (state, action: PayloadAction<{ roomId: string; unreadCount: number }>) => {
        state.isLoading = false;
        const { roomId } = action.payload;
        const messages = state.messages[roomId];
        if (messages) {
          messages.forEach(message => {
            message.isRead = true;
          });
        }
        state.error = null;
      })
      .addCase(markMessagesAsRead.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setActiveRoom, 
  addMessage, 
  updateMessage, 
  addRoom, 
  updateRoom, 
  clearMessages, 
  clearError 
} = chatSlice.actions;
export default chatSlice.reducer;


