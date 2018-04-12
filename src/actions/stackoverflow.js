import {
  FETCH_STACKOVERFLOW_QUESTIONS_REQUEST,
  FETCH_STACKOVERFLOW_QUESTIONS_FAILURE,
  FETCH_STACKOVERFLOW_QUESTIONS_SUCCESS
} from '../constants/actions';

const fetchStackoverflowQuestions = itemsCount => (dispatch) => {
  dispatch({
    type: FETCH_STACKOVERFLOW_QUESTIONS_REQUEST
  });

  fetch(`http://api.stackexchange.com/2.2/questions?pagesize=${itemsCount}&order=desc&sort=activity&site=stackoverflow`)
    .then(response => response.json())
    .then((response) => {
      const { items } = response;

      dispatch({
        type: FETCH_STACKOVERFLOW_QUESTIONS_SUCCESS,
        items
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_STACKOVERFLOW_QUESTIONS_FAILURE,
        error
      });
    });
};

export default fetchStackoverflowQuestions;
