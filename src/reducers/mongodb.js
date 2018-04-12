import get from 'lodash/get';
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS
} from '../constants/actions';

const initialState = {
  fetching: false,
  users: [],
  error: null
};

const mongodb = (state = initialState, action) => {
  const { type } = action;
  const users = get(action, 'users', []);
  const error = get(action, 'error', null);

  switch (type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        fetching: true
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        users
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        fetching: false,
        error
      };

    default:
      return state;
  }
};

export default mongodb;
