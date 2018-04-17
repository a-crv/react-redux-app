import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import ui from './ui';
import stackoverflow from './stackoverflow';
import mongodb from './mongodb';
import animatedItems from './animation';

export default combineReducers({
  ui,
  mongodb,
  stackoverflow,
  animatedItems,
  form: reduxFormReducer
});
