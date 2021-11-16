import {
  CHANGE_SERVICE_FIELD,
  RESET_FORM,
  FILL_EDIT_FORM,
} from '../actions/actionTypes';

const initialState = {
  add: {
    name: '',
    price: '',
    loading: false,
    error: null,
  },
  edit: {
    id: '',
    name: '',
    price: '',
    loading: false,
    error: null,
  },
};

export const serviceFormReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_SERVICE_FIELD: {
      const { name, value, formType } = payload;
      const formFields = state[formType];
      return { ...state, [formType]: { ...formFields, [name]: value } };
    }
    case FILL_EDIT_FORM: {
      const { id, name, price } = payload;
      return { ...state, edit: { id, name, price } };
    }
    case RESET_FORM: {
      const { formType } = payload;
      return { ...state, [formType]: { name: '', price: '' } };
    }
    default:
      return state;
  }
};
