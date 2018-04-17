import { IMPROVE_RATING, LOWER_RATING } from '../constants/actions';

export function changeRating(id) {
  return {
    type: IMPROVE_RATING,
    id
  };
}

export function lowerRating(id) {
  return {
    type: LOWER_RATING,
    id
  };
}
