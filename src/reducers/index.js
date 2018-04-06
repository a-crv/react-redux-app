import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import ui from './ui';

export default combineReducers({
  ui,
  form: reduxFormReducer
});
