import { combineReducers } from 'redux';

import auth from './reducers/auth';
import expense from './reducers/expense';

export default combineReducers({
  auth,
  expense,
});
