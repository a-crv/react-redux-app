import { IMPROVE_RATING, LOWER_RATING } from '../constants/actions';
import createReducer from './utils/createReducer';

const initialState = {
  id: null,
  rating: 0
};

const chandedItem = createReducer(initialState, {
  [IMPROVE_RATING](state, action) {
    const { id } = action;
    const { rating } = state;

    return {
      ...state,
      id,
      rating: rating + 1
    };
  },
  [LOWER_RATING](state, action) {
    const { id } = action;
    const { rating } = state;

    return {
      ...state,
      id,
      rating: rating - 1
    };
  }
});

export default chandedItem;
