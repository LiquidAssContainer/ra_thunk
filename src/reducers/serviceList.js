import { nanoid } from 'nanoid';

import {
  ADD_SERVICE,
  REMOVE_SERVICE,
  EDIT_SERVICE,
  FILTER_SERVICES,
} from '../actions/actionTypes';

import { services } from '../constants/dataBase';

const initialState = {
  services,
  filtered: null,
};

const filterByString = (string, services) => {
  return services.filter((service) => service.name.toLowerCase().includes(string.toLowerCase()));
};

export const serviceListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_SERVICE: {
      const { name, price } = payload;
      return {
        ...state,
        services: [
          ...state.services,
          { id: nanoid(), name, price: Number(price) },
        ],
      };
    }
    case REMOVE_SERVICE: {
      const { id } = payload;
      return {
        ...state,
        services: state.services.filter((service) => service.id !== id),
      };
    }
    case EDIT_SERVICE: {
      const { id, name, price } = payload;
      const serviceIndex = state.services.findIndex(
        (service) => service.id === id,
      );
      const newServiceList = [...state.services];
      newServiceList[serviceIndex] = { id, name, price };

      return {
        ...state,
        services: newServiceList,
      };
    }
    case FILTER_SERVICES: {
      const { string } = payload;
      return { ...state, filtered: filterByString(string, services) };
    }

    default:
      return state;
  }
};
