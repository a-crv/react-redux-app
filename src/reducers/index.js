import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import ui from './ui';
import stackoverflow from './stackoverflow';
import mongodb from './mongodb';
import chandedItem from './animation';

export default combineReducers({
  ui,
  mongodb,
  stackoverflow,
  chandedRatingItem: chandedItem,
  form: reduxFormReducer
});
