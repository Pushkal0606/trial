// src/api/client.js

const BASE_URL = '/api'; // Assuming Vite proxies '/api' to the backend

// Helper to get token
const getToken = () => localStorage.getItem('eduerp_token');

// Main fetch wrapper
async function apiFetch(endpoint, { method = 'GET', body, ...customConfig } = {}) {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers: { ...headers, ...customConfig.headers },
    ...customConfig,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const contentType = response.headers.get('content-type') || '';
    
    let data;
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error((data && data.message) ? data.message : 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${method} ${endpoint}:`, error);
    throw error;
  }
}

// Exports
export const client = {
  get: (endpoint, customConfig) => apiFetch(endpoint, { method: 'GET', ...customConfig }),
  post: (endpoint, body, customConfig) => apiFetch(endpoint, { method: 'POST', body, ...customConfig }),
  put: (endpoint, body, customConfig) => apiFetch(endpoint, { method: 'PUT', body, ...customConfig }),
  delete: (endpoint, customConfig) => apiFetch(endpoint, { method: 'DELETE', ...customConfig }),
};
