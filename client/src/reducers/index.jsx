import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './authReducer';
import usersReducer from './usersReducer';
import requestReducer from './requestReducer';

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  form: reduxForm,
  requests: requestReducer
});
