import {
  FETCH_STACKOVERFLOW_QUESTIONS_REQUEST,
  FETCH_STACKOVERFLOW_QUESTIONS_FAILURE,
  FETCH_STACKOVERFLOW_QUESTIONS_SUCCESS,
  STACKOVERFLOW_BASE_API_URL
} from '../constants/actions';

const fetchStackoverflowQuestions = itemsCount => async (dispatch) => {
  dispatch({
    type: FETCH_STACKOVERFLOW_QUESTIONS_REQUEST
  });

  try {
    const response =
      await fetch(`${STACKOVERFLOW_BASE_API_URL}/questions?pagesize=${itemsCount}&order=desc&sort=activity&site=stackoverflow`);

    if (response.ok) {
      const result = await response.json();
      const { items } = result;

      dispatch({
        type: FETCH_STACKOVERFLOW_QUESTIONS_SUCCESS,
        items
      });
    } else {
      throw response.json();
    }
  } catch (error) {
    const errorObject = await error;

    dispatch({
      type: FETCH_STACKOVERFLOW_QUESTIONS_FAILURE,
      error: errorObject
    });
  }
};

export default fetchStackoverflowQuestions;
