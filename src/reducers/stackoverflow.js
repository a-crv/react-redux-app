import get from 'lodash/get';
import {
  FETCH_STACKOVERFLOW_QUESTIONS_REQUEST,
  FETCH_STACKOVERFLOW_QUESTIONS_FAILURE,
  FETCH_STACKOVERFLOW_QUESTIONS_SUCCESS
} from '../constants/actions';

const initialState = {
  fetching: false,
  questions: [],
  error: null
};

const stackoverflow = (state = initialState, action) => {
  const { type } = action;
  const questions = get(action, 'items', []);
  const error = get(action, 'error', null);

  switch (type) {
    case FETCH_STACKOVERFLOW_QUESTIONS_REQUEST:
      return {
        ...state,
        fetching: true
      };

    case FETCH_STACKOVERFLOW_QUESTIONS_SUCCESS:
      return {
        ...state,
        fetching: false,
        questions
      };

    case FETCH_STACKOVERFLOW_QUESTIONS_FAILURE:
      return {
        ...state,
        fetching: false,
        error
      };

    default:
      return state;
  }
};

export default stackoverflow;
