import { UPDATE_RATING } from '../constants/actions';

export default function updateRating(id, changeAction) {
  return {
    type: UPDATE_RATING,
    payload: {
      id,
      changeAction
    }
  };
}
