import {
  CHANGE_EDIT_SERVICE_FIELD,
  FILL_EDIT_FORM,
  RESET_EDIT_FORM,
  EDIT_SERVICE_REQUEST,
  EDIT_SERVICE_FAILURE,
  EDIT_SERVICE_SUCCESS,
  GET_SERVICE,
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
    case GET_SERVICE: {
      const { id, name, price, content } = payload;
      return { ...state, service: { id, name, price, content } };
    }

    case CHANGE_EDIT_SERVICE_FIELD: {
      const { name, value } = payload;
      return { ...state, service: { ...state.service, [name]: value } };
    }

    case EDIT_SERVICE_REQUEST: {
      return { ...state, loading: true, error: null };
    }

    case EDIT_SERVICE_FAILURE: {
      const { error } = payload;
      return { ...state, loading: false, error };
    }

    case EDIT_SERVICE_SUCCESS: {
      return { ...initialState };
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
