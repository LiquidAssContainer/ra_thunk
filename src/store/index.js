import { createStore, combineReducers } from 'redux';

import { serviceListReducer } from '../reducers/serviceList';
import { serviceFormReducer } from '../reducers/serviceForm';
import { editModalReducer } from '../reducers/editModal';

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceForm: serviceFormReducer,
  editModal: editModalReducer,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
