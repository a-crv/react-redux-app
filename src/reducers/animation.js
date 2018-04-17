import { IMPROVE_RATING, LOWER_RATING } from '../constants/actions';
import createReducer from './utils/createReducer';

const initialState = {
  item: {
    id: null,
    rating: 0
  }
};

const animatedItems = createReducer(initialState, {
  [IMPROVE_RATING](state, action) {
    const { id } = action;

    return {
      ...state,
      id,
      rating: 1
    };
  },
  [LOWER_RATING](state, action) {
    const { id } = action;

    return {
      ...state,
      id,
      rating: -1
    };
  }
});

export default animatedItems;
