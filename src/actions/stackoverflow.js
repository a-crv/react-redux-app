import reduce from 'lodash/reduce';
import {
  CLEAR_QUESTIONS,
  FETCH_STACKOVERFLOW_REQUEST,
  FETCH_STACKOVERFLOW_FAILURE,
  STACKOVERFLOW_BASE_API_URL
} from '../constants/actions';

const clearQuestions = () => ({
  type: CLEAR_QUESTIONS
});

const getStackoverflow = (actionName, url, params) => async (dispatch) => {
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
