import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS
} from '../constants/actions';

// const fetchUsers = () => (dispatch) => {
//   dispatch({
//     type: FETCH_USERS_REQUEST
//   });

//   fetch('/api/authorsasd')
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       }

//       throw response.text();
//     })
//     .then((response) => {
//       dispatch({
//         type: FETCH_USERS_SUCCESS,
//         users: response
//       });
//     })
//     .catch((error) => {
//       error.then((errorText) => {
//         dispatch({
//           type: FETCH_USERS_FAILURE,
//           error: errorText
//         });
//       });
//     });
// };

const fetchUsers = () => async (dispatch) => {
  dispatch({
    type: FETCH_USERS_REQUEST
  });

  try {
    const response = await fetch('/api/authors');

    if (response.ok) {
      const result = await response.json();
      dispatch({
        type: FETCH_USERS_SUCCESS,
        users: result
      });
    } else {
      throw response.text();
    }
  } catch (error) {
    const errorMessage = await error;
    dispatch({
      type: FETCH_USERS_FAILURE,
      error: errorMessage
    });
  }
};

export default fetchUsers;
