import get from 'lodash/get';
import {
  FETCH_STACKOVERFLOW_REQUEST,
  FETCH_STACKOVERFLOW_FAILURE,
  FETCH_QUESTIONS_STACKOVERFLOW,
  FETCH_AUTHOR_QUESTIONS_STACKOVERFLOW,
  FETCH_ANSWERS_FOR_QUESTIONS_STACKOVERFLOW
} from '../constants/actions';

const initialState = {
  fetching: false,
  questions: [],
  authorQuestions: [],
  answers: [],
  error: null
};

const stackoverflow = (state = initialState, action) => {
  const { type } = action;
  const items = get(action, 'items', []);
  const error = get(action, 'error', null);

  switch (type) {
    case FETCH_STACKOVERFLOW_REQUEST:
      return {
        ...state,
        fetching: true
      };

    case FETCH_AUTHOR_QUESTIONS_STACKOVERFLOW:
      return {
        ...state,
        fetching: false,
        authorQuestions: items
      };

    case FETCH_QUESTIONS_STACKOVERFLOW:
      return {
        ...state,
        fetching: false,
        questions: items
      };

    case FETCH_ANSWERS_FOR_QUESTIONS_STACKOVERFLOW:
      return {
        ...state,
        fetching: false,
        answers: items
      };

    case FETCH_STACKOVERFLOW_FAILURE:
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
