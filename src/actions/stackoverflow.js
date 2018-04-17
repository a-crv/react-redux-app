import reduce from 'lodash/reduce';
import {
  CLEAR_STACKOVERFLOW_QUESTIONS,
  FETCH_STACKOVERFLOW_REQUEST,
  FETCH_STACKOVERFLOW_FAILURE
} from '../constants/actions';
import { STACKOVERFLOW_BASE_API_URL } from '../constants/ui';

const clearQuestions = () => ({
  type: CLEAR_STACKOVERFLOW_QUESTIONS
});

const getStackoverflow = (actionName, url, params, cb) => async (dispatch) => {
  /* eslint-disable */
  if (typeof params === 'function' && typeof cb === 'undefined') {
    cb = params;
    params = undefined;
  }
  /* eslint-enable */

  const responseParams = reduce(params, (result, value, key) => {
    if (result === '?') {
      return `${result}${key}=${value}`;
    }

    return `${result}&${key}=${value}`;
  }, '?');

  dispatch({
    type: FETCH_STACKOVERFLOW_REQUEST
  });

  try {
    const response =
      await fetch(`${STACKOVERFLOW_BASE_API_URL}${url}${responseParams}&order=desc&sort=activity&site=stackoverflow`);

    if (response.ok) {
      const result = await response.json();
      const { items } = result;

      dispatch({
        type: actionName,
        items
      });

      cb();
    } else {
      throw response.json();
    }
  } catch (error) {
    const errorObject = await error;

    dispatch({
      type: FETCH_STACKOVERFLOW_FAILURE,
      error: errorObject
    });
  }
};

export { clearQuestions, getStackoverflow };
