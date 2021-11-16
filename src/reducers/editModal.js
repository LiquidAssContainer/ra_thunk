import { CHANGE_MODAL_STATE } from '../actions/actionTypes';

export const editModalReducer = (
  state = { isOpen: false },
  { type, payload },
) => {
  switch (type) {
    case CHANGE_MODAL_STATE: {
      const { isOpen } = payload;
      return { isOpen };
    }
    default:
      return state;
  }
};
