import axios from 'axios';

const addSignupErrors = (error) => {
  return (dispatch) => dispatch({ type: 'ADD_SIGNUP_ERRORS', payload: error });
};

const addLoginErrors = (error) => {
  return (dispatch) => dispatch({ type: 'ADD_LOGIN_ERRORS', payload: error });
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('api/users/auth');

    dispatch({
      type: 'USER_LOADED',
      payload: res.data,
    });
  } catch (err) {
    localStorage.removeItem('token');
    dispatch({
      type: 'AUTH_ERROR',
    });
  }
};

// Register User
export const register = (data) => async (dispatch) => {
  dispatch({ type: 'CLEAR_SIGNUP_ERRORS' });
  try {
    const res = await axios.post('api/users/signup', data);

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data,
    });
    axios.defaults.headers.common['Authorization'] = res.data.token;
    localStorage.setItem('token', res.data.token);
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      localStorage.removeItem('token');
      errors.forEach((error) => {
        let param = error.param;
        dispatch(addSignupErrors({ [param]: error.msg }));
      });
    }
  }
};

// Login User
export const login = (data) => async (dispatch) => {
  dispatch({ type: 'CLEAR_LOGIN_ERRORS' });
  try {
    const res = await axios.post('api/users/login', data);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data,
    });
    axios.defaults.headers.common['Authorization'] = res.data.token;
    localStorage.setItem('token', res.data.token);
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      localStorage.removeItem('token');
      errors.forEach((error) => {
        let param = error.param;
        dispatch(addLoginErrors({ [param]: error.msg }));
      });
    }
  }
};
