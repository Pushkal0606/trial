import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const USER_STORAGE_KEY = 'eduerp_user';
const ROLE_STORAGE_KEY = 'eduerp_role';
const TOKEN_STORAGE_KEY = 'eduerp_token';
const AUTH_BASE_URL = '/api/auth';

const normalizeRole = (value) => (typeof value === 'string' ? value.trim().toLowerCase() : '');

const extractAuthData = (payload, fallbackRole = '') => {
  const user = payload?.user ?? null;
  const normalizedRole = normalizeRole(user?.role || fallbackRole);

  if (!user || !normalizedRole) {
    return null;
  }

  return {
    user: {
      ...user,
      role: normalizedRole,
    },
    role: normalizedRole,
    token: payload?.token ?? '',
  };
};

const persistSession = ({ user, role, token }) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(ROLE_STORAGE_KEY, role);
  localStorage.setItem(TOKEN_STORAGE_KEY, token || '');
};

const clearSession = () => {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(ROLE_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return {
    message: text || 'Unexpected server response.',
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      const storedRole = normalizeRole(localStorage.getItem(ROLE_STORAGE_KEY));
      const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY) || '';

      if (storedUser && storedRole) {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          role: normalizeRole(parsedUser.role || storedRole),
        });
        setRole(storedRole);
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Failed to restore auth session:', error);
      clearSession();
    } finally {
      setLoading(false);
    }
  }, []);

  const applySession = (authData) => {
    setUser(authData.user);
    setRole(authData.role);
    setToken(authData.token);
    persistSession(authData);
  };

  const login = async (email, password, selectedRole) => {
    try {
      const response = await fetch(`${AUTH_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const payload = await parseResponse(response);

      if (!response.ok) {
        return {
          success: false,
          message: payload?.message || 'Login failed. Please try again.',
        };
      }

      const authData = extractAuthData(payload, selectedRole);

      if (!authData) {
        return {
          success: false,
          message: 'Login succeeded but the server response was incomplete.',
        };
      }

      if (authData.role !== normalizeRole(selectedRole)) {
        return {
          success: false,
          message: `This account is registered as ${authData.role}, not ${selectedRole}.`,
        };
      }

      applySession(authData);

      return {
        success: true,
        user: authData.user,
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Unable to reach the server. Please make sure the backend is running.',
      };
    }
  };

  const signup = async ({ name, email, password, confirmPassword, selectedRole }) => {
    try {
      const response = await fetch(`${AUTH_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          confirmPassword,
          role: normalizeRole(selectedRole),
        }),
      });

      const payload = await parseResponse(response);

      if (!response.ok) {
        return {
          success: false,
          message: payload?.message || 'Signup failed. Please try again.',
        };
      }

      const authData = extractAuthData(payload, selectedRole);

      if (!authData) {
        return {
          success: false,
          message: 'Signup succeeded but the server response was incomplete.',
        };
      }

      applySession(authData);

      return {
        success: true,
        user: authData.user,
      };
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Unable to reach the server. Please make sure the backend is running.',
      };
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setToken('');
    clearSession();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, role, token, isAuthenticated, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
