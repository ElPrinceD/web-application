import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EmergencyState, EmergencyRequest } from '../../types';
import { apiService } from '../../services/api';

const initialState: EmergencyState = {
  activeRequest: null,
  requests: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const createEmergencyRequest = createAsyncThunk(
  'emergency/createRequest',
  async (requestData: { 
    type: 'police' | 'fire' | 'medical'; 
    priority: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    location: { latitude: number; longitude: number; address: string };
  }, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/emergency/requests/', requestData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create emergency request');
    }
  }
);

export const fetchEmergencyRequests = createAsyncThunk(
  'emergency/fetchRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/emergency/requests/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch emergency requests');
    }
  }
);

export const updateEmergencyRequestStatus = createAsyncThunk(
  'emergency/updateStatus',
  async ({ requestId, status }: { requestId: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.patch(`/emergency/requests/${requestId}/`, { status });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update emergency request status');
    }
  }
);

export const assignEmergencyOperator = createAsyncThunk(
  'emergency/assignOperator',
  async ({ requestId, operatorId }: { requestId: string; operatorId: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`/emergency/requests/${requestId}/assign/`, { operatorId });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to assign emergency operator');
    }
  }
);

export const resolveEmergencyRequest = createAsyncThunk(
  'emergency/resolveRequest',
  async ({ requestId, resolution }: { requestId: string; resolution: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`/emergency/requests/${requestId}/resolve/`, { resolution });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to resolve emergency request');
    }
  }
);

const emergencySlice = createSlice({
  name: 'emergency',
  initialState,
  reducers: {
    setActiveRequest: (state, action: PayloadAction<EmergencyRequest | null>) => {
      state.activeRequest = action.payload;
    },
    addRequest: (state, action: PayloadAction<EmergencyRequest>) => {
      state.requests.unshift(action.payload);
    },
    updateRequest: (state, action: PayloadAction<EmergencyRequest>) => {
      const index = state.requests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
      
      // Update active request if it's the same
      if (state.activeRequest && state.activeRequest.id === action.payload.id) {
        state.activeRequest = action.payload;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Emergency Request
      .addCase(createEmergencyRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEmergencyRequest.fulfilled, (state, action: PayloadAction<EmergencyRequest>) => {
        state.isLoading = false;
        state.requests.unshift(action.payload);
        state.activeRequest = action.payload;
        state.error = null;
      })
      .addCase(createEmergencyRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Emergency Requests
      .addCase(fetchEmergencyRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmergencyRequests.fulfilled, (state, action: PayloadAction<EmergencyRequest[]>) => {
        state.isLoading = false;
        state.requests = action.payload;
        state.error = null;
      })
      .addCase(fetchEmergencyRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Emergency Request Status
      .addCase(updateEmergencyRequestStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEmergencyRequestStatus.fulfilled, (state, action: PayloadAction<EmergencyRequest>) => {
        state.isLoading = false;
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        
        // Update active request if it's the same
        if (state.activeRequest && state.activeRequest.id === action.payload.id) {
          state.activeRequest = action.payload;
        }
        state.error = null;
      })
      .addCase(updateEmergencyRequestStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Assign Emergency Operator
      .addCase(assignEmergencyOperator.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(assignEmergencyOperator.fulfilled, (state, action: PayloadAction<EmergencyRequest>) => {
        state.isLoading = false;
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        
        // Update active request if it's the same
        if (state.activeRequest && state.activeRequest.id === action.payload.id) {
          state.activeRequest = action.payload;
        }
        state.error = null;
      })
      .addCase(assignEmergencyOperator.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Resolve Emergency Request
      .addCase(resolveEmergencyRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resolveEmergencyRequest.fulfilled, (state, action: PayloadAction<EmergencyRequest>) => {
        state.isLoading = false;
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        
        // Update active request if it's the same
        if (state.activeRequest && state.activeRequest.id === action.payload.id) {
          state.activeRequest = action.payload;
        }
        state.error = null;
      })
      .addCase(resolveEmergencyRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveRequest, addRequest, updateRequest, clearError } = emergencySlice.actions;
export default emergencySlice.reducer;


