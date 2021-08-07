import {
    AUTH_ERROR,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    USER_LOADING,
    USER_LOADED,
  } from "../actions/type";
  
  const initialState = {
      token: localStorage.getItem('token'),
      isAuthenticated: null, 
      isLoading: false, 
      user: null
  } 
  
  const 