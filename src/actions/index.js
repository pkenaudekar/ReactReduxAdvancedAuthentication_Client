import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = axios.post('http://localhost:5000/signup', formProps);

    dispatch({ type: AUTH_USER, payload: (await response).data.token });
    localStorage.setItem('token', (await response).data.token); // we store generated token to browsers loacl storage for the purpose of data persistance
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, paylod: 'Email in use' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: '',
  };
};

export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = axios.post('http://localhost:5000/signin', formProps);

    dispatch({ type: AUTH_USER, payload: (await response).data.token });
    localStorage.setItem('token', (await response).data.token); // we store generated token to browsers loacl storage for the purpose of data persistance
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, paylod: 'invalid login credential' });
  }
};
