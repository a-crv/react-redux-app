import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import ui from './ui';
import stackoverflow from './stackoverflow';

export default combineReducers({
  ui,
  stackoverflow,
  form: reduxFormReducer
});
