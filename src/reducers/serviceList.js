import {
  ADD_SERVICE,
  REMOVE_SERVICE,
  EDIT_SERVICE,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  services: [],
  loading: false,
  error: null,
};

export const serviceListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SERVICES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_SERVICES_FAILURE:
      const { error } = payload;
      return { ...state, loading: false, error };

    case FETCH_SERVICES_SUCCESS:
      const { items } = payload;
      return {
        ...initialState,
        services: items,
      };

    case ADD_SERVICE: {
      const { id, name, price, content } = payload;
      return {
        ...state,
        services: [
          ...state.services,
          { id, name, price: Number(price), content },
        ],
      };
    }

    case REMOVE_SERVICE: {
      const { id } = payload;
      return {
        ...state,
        services: state.services.filter((service) => service.id != id),
      };
    }

    case EDIT_SERVICE: {
      const { id, name, price, content } = payload;
      const serviceIndex = state.services.findIndex(
        (service) => service.id == id,
      );
      const newServiceList = [...state.services];
      newServiceList[serviceIndex] = { id, name, price, content };

      return {
        ...state,
        services: newServiceList,
      };
    }

    default:
      return state;
  }
};
