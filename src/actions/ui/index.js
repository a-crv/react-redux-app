import { TOGGLE_SIDEBAR } from '../../constants/actions';

export const openSidebar = isOpen => ({
  type: TOGGLE_SIDEBAR,
  isOpen
});
