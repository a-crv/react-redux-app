import { UPDATE_RATING } from '../constants/actions';
import createReducer from './utils/createReducer';

const initialState = {
  id: null,
  changeAction: ''
};

const chandedItem = createReducer(initialState, {
  [UPDATE_RATING](state, action) {
    const { id, changeAction } = action.payload;

    return {
      ...state,
      id,
      changeAction
    };
  }
});

export default chandedItem;
