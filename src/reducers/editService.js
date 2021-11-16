import {
  CHANGE_EDIT_SERVICE_FIELD,
  FILL_EDIT_FORM,
  RESET_EDIT_FORM,
} from '../actions/actionTypes';

const initialState = {
  service: {
    id: '',
    name: '',
    price: '',
    content: '',
  },
  loading: false,
  error: null,
};

export const editServiceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_EDIT_SERVICE_FIELD: {
      const { name, value } = payload;
      return { ...state, service: { ...state.service, [name]: value } };
    }

    case FILL_EDIT_FORM: {
      const { id, name, price, content } = payload;
      return { ...state, service: { id, name, price, content } };
    }

    case RESET_EDIT_FORM: {
      return { ...initialState };
    }

    default:
      return state;
  }
};
