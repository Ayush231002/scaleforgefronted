import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { userAuthService } from '../config';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Action types
const USER_AUTH_ACTIONS = {
  LOGIN_START: 'USER_LOGIN_START',
  LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USER_LOGIN_FAILURE',
  LOGOUT: 'USER_LOGOUT',
  REGISTER_START: 'USER_REGISTER_START',
  REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
  REGISTER_FAILURE: 'USER_REGISTER_FAILURE',
  GET_USER_START: 'USER_GET_USER_START',
  GET_USER_SUCCESS: 'USER_GET_USER_SUCCESS',
  GET_USER_FAILURE: 'USER_GET_USER_FAILURE',
  CLEAR_ERROR: 'USER_CLEAR_ERROR',
};

// Reducer
const userAuthReducer = (state, action) => {
  switch (action.type) {
    case USER_AUTH_ACTIONS.LOGIN_START:
    case USER_AUTH_ACTIONS.REGISTER_START:
      return { ...state, isLoading: true, error: null };
    
    case USER_AUTH_ACTIONS.LOGIN_SUCCESS:
    case USER_AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    
    case USER_AUTH_ACTIONS.LOGIN_FAILURE:
    case USER_AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    
    case USER_AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    
    case USER_AUTH_ACTIONS.GET_USER_START:
      return { ...state, isLoading: true };
    
    case USER_AUTH_ACTIONS.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    
    case USER_AUTH_ACTIONS.GET_USER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    
    case USER_AUTH_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    default:
      return state;
  }
};

// Create context
const UserAuthContext = createContext();

// Provider component
export const UserAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userAuthReducer, initialState);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const user = localStorage.getItem('user');
      if (user) {
        try {
          dispatch({ type: USER_AUTH_ACTIONS.GET_USER_START });
          const response = await userAuthService.getCurrentUser();
          dispatch({
            type: USER_AUTH_ACTIONS.GET_USER_SUCCESS,
            payload: { user: response.data.user },
          });
        } catch (error) {
          // Token is invalid, remove it
          localStorage.removeItem('user');
          dispatch({ type: USER_AUTH_ACTIONS.GET_USER_FAILURE });
        }
      } else {
        dispatch({ type: USER_AUTH_ACTIONS.GET_USER_FAILURE });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: USER_AUTH_ACTIONS.LOGIN_START });
      const response = await userAuthService.login(credentials);
      
      // Store user
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      dispatch({
        type: USER_AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user: response.data.user },
      });

      return response;
    } catch (error) {
      dispatch({
        type: USER_AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: USER_AUTH_ACTIONS.REGISTER_START });
      const response = await userAuthService.register(userData);
      
      // Store user
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      dispatch({
        type: USER_AUTH_ACTIONS.REGISTER_SUCCESS,
        payload: { user: response.data.user },
      });

      return response;
    } catch (error) {
      dispatch({
        type: USER_AUTH_ACTIONS.REGISTER_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await userAuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear user and state
      localStorage.removeItem('user');
      dispatch({ type: USER_AUTH_ACTIONS.LOGOUT });
    }
  };

  // Change password function
  const changePassword = async (passwordData) => {
    try {
      const response = await userAuthService.changePassword(passwordData);
      return response;
    } catch (error) {
      dispatch({
        type: USER_AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: USER_AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    changePassword,
    clearError,
  };

  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

// Hook to use the context
export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error('useUserAuth must be used within a UserAuthProvider');
  }
  return context;
};

export default UserAuthContext;
