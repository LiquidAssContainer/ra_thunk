import { createStore, combineReducers } from 'redux';

import { serviceListReducer } from '../reducers/serviceList';
import { editModalReducer } from '../reducers/editModal';
import { addServiceReducer } from '../reducers/addService';
import { editServiceReducer } from '../reducers/editService';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  addService: addServiceReducer,
  editService: editServiceReducer,
  editModal: editModalReducer,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
