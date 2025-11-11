"use strict";

// Use environment variable for API base URL, fallback to localhost for development
// Ensure baseURL includes /api prefix for nginx routing
let baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";
// If baseURL doesn't include /api, add it
// Check if it's a full URL with port (like http://host:3000) - in that case, use /api path
if (baseURL.includes('://') && baseURL.match(/:\d+$/)) {
  // Full URL with port - replace port with /api
  baseURL = baseURL.replace(/:\d+$/, '/api');
} else if (!baseURL.includes('/api')) {
  // No /api found - add it
  baseURL = baseURL.endsWith('/') ? baseURL + 'api' : baseURL + '/api';
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.baseURL = baseURL; 
