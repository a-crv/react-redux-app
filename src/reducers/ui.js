import { TOGGLE_SIDEBAR } from '../constants/actions';

const initialState = {
  isOpenSidebar: false
};

const ui = (state = initialState, action) => {
  const { type } = action;
  const { isOpenSidebar } = state;

  switch (type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpenSidebar: !isOpenSidebar
      };

    default:
      return state;
  }
};

export default ui;
