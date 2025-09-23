import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ServicesState, ServiceCategory, ServiceRequest, ServiceProvider, Quote } from '../../types';
import { apiService } from '../../services/api';

const initialState: ServicesState = {
  categories: [],
  requests: [],
  providers: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchServiceCategories = createAsyncThunk(
  'services/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/services/categories/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const fetchServiceRequests = createAsyncThunk(
  'services/fetchRequests',
  async (params: { categoryId?: string; status?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/requests/requests/', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch requests');
    }
  }
);

export const createServiceRequest = createAsyncThunk(
  'services/createRequest',
  async (requestData: Partial<ServiceRequest>, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/requests/requests/', requestData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create request');
    }
  }
);

export const fetchServiceProviders = createAsyncThunk(
  'services/fetchProviders',
  async (params: { categoryId?: string; location?: { lat: number; lng: number } } = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/providers/', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch providers');
    }
  }
);

export const submitQuote = createAsyncThunk(
  'services/submitQuote',
  async (quoteData: { requestId: string; amount: number; description: string; estimatedDuration: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/requests/quotes/', quoteData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit quote');
    }
  }
);

export const acceptQuote = createAsyncThunk(
  'services/acceptQuote',
  async (quoteId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`/requests/quotes/${quoteId}/accept/`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to accept quote');
    }
  }
);

export const updateRequestStatus = createAsyncThunk(
  'services/updateRequestStatus',
  async ({ requestId, status }: { requestId: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await apiService.patch(`/requests/requests/${requestId}/`, { status });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update request status');
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    addRequest: (state, action: PayloadAction<ServiceRequest>) => {
      state.requests.unshift(action.payload);
    },
    updateRequest: (state, action: PayloadAction<ServiceRequest>) => {
      const index = state.requests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    addQuote: (state, action: PayloadAction<{ requestId: string; quote: Quote }>) => {
      const request = state.requests.find(req => req.id === action.payload.requestId);
      if (request) {
        if (!request.quotes) {
          request.quotes = [];
        }
        request.quotes.push(action.payload.quote);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchServiceCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServiceCategories.fulfilled, (state, action: PayloadAction<ServiceCategory[]>) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchServiceCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Requests
      .addCase(fetchServiceRequests.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServiceRequests.fulfilled, (state, action: PayloadAction<ServiceRequest[]>) => {
        state.isLoading = false;
        state.requests = action.payload;
        state.error = null;
      })
      .addCase(fetchServiceRequests.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Request
      .addCase(createServiceRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createServiceRequest.fulfilled, (state, action: PayloadAction<ServiceRequest>) => {
        state.isLoading = false;
        state.requests.unshift(action.payload);
        state.error = null;
      })
      .addCase(createServiceRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Providers
      .addCase(fetchServiceProviders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServiceProviders.fulfilled, (state, action: PayloadAction<ServiceProvider[]>) => {
        state.isLoading = false;
        state.providers = action.payload;
        state.error = null;
      })
      .addCase(fetchServiceProviders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Submit Quote
      .addCase(submitQuote.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(submitQuote.fulfilled, (state, action: PayloadAction<Quote>) => {
        state.isLoading = false;
        const request = state.requests.find(req => req.id === action.payload.requestId);
        if (request) {
          if (!request.quotes) {
            request.quotes = [];
          }
          request.quotes.push(action.payload);
        }
        state.error = null;
      })
      .addCase(submitQuote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Accept Quote
      .addCase(acceptQuote.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(acceptQuote.fulfilled, (state, action: PayloadAction<ServiceRequest>) => {
        state.isLoading = false;
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(acceptQuote.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Request Status
      .addCase(updateRequestStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action: PayloadAction<ServiceRequest>) => {
        state.isLoading = false;
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCategory, addRequest, updateRequest, addQuote, clearError } = servicesSlice.actions;
export default servicesSlice.reducer;


