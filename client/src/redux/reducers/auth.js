const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null,
  signupErrors: {},
  loginErrors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        ...payload,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...payload,
      };
    case 'ADD_LOGIN_ERRORS':
      return {
        ...state,
        loginErrors: { ...state.loginErrors, ...payload },
        token: null,
        isAuthenticated: false,
      };
    case 'CLEAR_LOGIN_ERRORS':
      return {
        ...state,
        loginErrors: {},
      };
    case 'ADD_SIGNUP_ERRORS':
      return {
        ...state,
        signupErrors: { ...state.signupErrors, ...payload },
        token: null,
        isAuthenticated: false,
      };
    case 'CLEAR_SIGNUP_ERRORS':
      return {
        ...state,
        signupErrors: {},
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
