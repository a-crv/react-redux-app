import { IMPROVE_RATING, LOWER_RATING } from '../constants/actions';
import createReducer from './utils/createReducer';

const initialState = {
  id: null,
  ratingAction: 0
};

const chandedItem = createReducer(initialState, {
  [IMPROVE_RATING](state, action) {
    const { id } = action;
    const { ratingAction } = state;

    return {
      ...state,
      id,
      ratingAction
    };
  },
  [LOWER_RATING](state, action) {
    const { id } = action;
    const { ratingAction } = state;

    return {
      ...state,
      id,
      ratingAction
    };
  }
});

export default chandedItem;
