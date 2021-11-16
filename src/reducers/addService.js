import {
  CHANGE_ADD_SERVICE_FIELD,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  service: {
    name: '',
    price: '',
    content: '',
  },
  loading: false,
  error: null,
};

export const addServiceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_ADD_SERVICE_FIELD: {
      const { name, value } = payload;
      return { ...state, service: { ...state.service, [name]: value } };
    }

    case ADD_SERVICE_REQUEST: {
      return { ...state, loading: true, error: null };
    }

    case ADD_SERVICE_FAILURE: {
      const { error } = payload;
      return { ...state, loading: false, error };
    }

    case ADD_SERVICE_SUCCESS: {
      return { ...initialState };
    }

    default:
      return state;
  }
};
