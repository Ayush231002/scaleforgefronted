import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { adminAuthService } from '../config';

// Initial state
const initialState = {
  admin: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
const ADMIN_AUTH_ACTIONS = {
  LOGIN_START: 'ADMIN_LOGIN_START',
  LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'ADMIN_LOGIN_FAILURE',
  REGISTER_START: 'ADMIN_REGISTER_START',
  REGISTER_SUCCESS: 'ADMIN_REGISTER_SUCCESS',
  REGISTER_FAILURE: 'ADMIN_REGISTER_FAILURE',
  LOGOUT: 'ADMIN_LOGOUT',
  GET_ADMIN_START: 'ADMIN_GET_ADMIN_START',
  GET_ADMIN_SUCCESS: 'ADMIN_GET_ADMIN_SUCCESS',
  GET_ADMIN_FAILURE: 'ADMIN_GET_ADMIN_FAILURE',
  CLEAR_ERROR: 'ADMIN_CLEAR_ERROR',
};

// Reducer
const adminAuthReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_AUTH_ACTIONS.LOGIN_START:
      return { ...state, isLoading: true, error: null };
    
    case ADMIN_AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        admin: action.payload.admin,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    
    case ADMIN_AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        admin: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case ADMIN_AUTH_ACTIONS.REGISTER_START:
      return { ...state, isLoading: true, error: null };
    
    case ADMIN_AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    
    case ADMIN_AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    
    case ADMIN_AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        admin: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    
    case ADMIN_AUTH_ACTIONS.GET_ADMIN_START:
      return { ...state, isLoading: true };
    
    case ADMIN_AUTH_ACTIONS.GET_ADMIN_SUCCESS:
      return {
        ...state,
        admin: action.payload.admin,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    
    case ADMIN_AUTH_ACTIONS.GET_ADMIN_FAILURE:
      return {
        ...state,
        admin: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    
    case ADMIN_AUTH_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Create context
const AdminAuthContext = createContext();

// Provider component
export const AdminAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminAuthReducer, initialState);

  // Check if admin is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const admin = localStorage.getItem('admin');
      const adminToken = localStorage.getItem('adminToken');
      
      if (admin && adminToken) {
        try {
          dispatch({ type: ADMIN_AUTH_ACTIONS.GET_ADMIN_START });
          const response = await adminAuthService.getCurrentAdmin();
          dispatch({
            type: ADMIN_AUTH_ACTIONS.GET_ADMIN_SUCCESS,
            payload: { admin: response.data.user },
          });
        } catch (error) {
          // Token is invalid, remove both admin and token
          localStorage.removeItem('admin');
          localStorage.removeItem('adminToken');
          dispatch({ type: ADMIN_AUTH_ACTIONS.GET_ADMIN_FAILURE });
        }
      } else {
        // Clear any partial data
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');
        dispatch({ type: ADMIN_AUTH_ACTIONS.GET_ADMIN_FAILURE });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: ADMIN_AUTH_ACTIONS.LOGIN_START });
      const response = await adminAuthService.login(credentials);
      
      // Store admin data and token
      if (response.data.user) {
        localStorage.setItem('admin', JSON.stringify(response.data.user));
      }
      
      // Store JWT token if available
      if (response.data.accessToken) {
        localStorage.setItem('adminToken', response.data.accessToken);
      }
      
      // Also check for cookie-based token
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
      }
      
      dispatch({
        type: ADMIN_AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { admin: response.data.user },
      });
      
      return response;
    } catch (error) {
      dispatch({
        type: ADMIN_AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message || 'Login failed',
      });
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: ADMIN_AUTH_ACTIONS.REGISTER_START });
      const response = await adminAuthService.register(userData);
      
      dispatch({
        type: ADMIN_AUTH_ACTIONS.REGISTER_SUCCESS,
      });
      
      return response;
    } catch (error) {
      dispatch({
        type: ADMIN_AUTH_ACTIONS.REGISTER_FAILURE,
        payload: error.message || 'Registration failed',
      });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await adminAuthService.logout();
    } catch (error) {
      console.error('Admin logout error:', error);
    } finally {
      // Clear admin data and token
      localStorage.removeItem('admin');
      localStorage.removeItem('adminToken');
      dispatch({ type: ADMIN_AUTH_ACTIONS.LOGOUT });
    }
  };

  // Change password function
  const changePassword = async (passwordData) => {
    try {
      const response = await adminAuthService.changePassword(passwordData);
      return response;
    } catch (error) {
      dispatch({
        type: ADMIN_AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };

  // Get registration status
  const getRegistrationStatus = async () => {
    try {
      const response = await adminAuthService.getRegistrationStatus();
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Update registration status
  const updateRegistrationStatus = async (isRegisterEnabled) => {
    try {
      const response = await adminAuthService.updateRegistrationStatus(isRegisterEnabled);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: ADMIN_AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    changePassword,
    getRegistrationStatus,
    updateRegistrationStatus,
    clearError,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Hook to use the context
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export default AdminAuthContext;
