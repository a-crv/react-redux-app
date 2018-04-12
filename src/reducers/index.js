import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import ui from './ui';
import stackoverflow from './stackoverflow';
import mongodb from './mongodb';

export default combineReducers({
  ui,
  mongodb,
  stackoverflow,
  form: reduxFormReducer
});
