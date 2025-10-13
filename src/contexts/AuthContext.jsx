/**
 * Authentication Context Provider
 * @module contexts/AuthContext
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { env } from '../config/env';

const AuthContext = createContext(null);

// Mock user for development
const mockUser = {
  id: 'USR-001',
  email: 'admin@aabo.com',
  name: 'Juan Pérez',
  role: 'ADMIN',
  permissions: ['project:view', 'project:create', 'document:approve', 'admin:access'],
  projectIds: ['PROJ-001', 'PROJ-002', 'PROJ-003'],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth token on mount
    const checkAuth = () => {
      // In development with mocks, auto-authenticate with mock user
      if (env.useMocks && env.isDevelopment) {
        setUser(mockUser);
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('authToken');
      if (token) {
        // Validate token and fetch user data
        // For now, just set loading to false
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    // API call to login
    // Set user and token
    setUser(credentials.user);
    setIsAuthenticated(true);
    localStorage.setItem('authToken', credentials.token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

