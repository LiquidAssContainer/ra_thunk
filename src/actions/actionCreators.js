import {
  ADD_SERVICE,
  REMOVE_SERVICE,
  EDIT_SERVICE,
  CHANGE_MODAL_STATE,
  FILL_EDIT_FORM,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAILURE,
  CHANGE_ADD_SERVICE_FIELD,
  CHANGE_EDIT_SERVICE_FIELD,
  RESET_EDIT_FORM,
} from './actionTypes';

export const addService = (item) => {
  return { type: ADD_SERVICE, payload: item };
};

export const removeService = (id) => {
  return { type: REMOVE_SERVICE, payload: { id } };
};

export const editService = (id, name, price) => {
  return { type: EDIT_SERVICE, payload: { id, name, price } };
};

export const changeAddServiceField = (name, value) => {
  return { type: CHANGE_ADD_SERVICE_FIELD, payload: { name, value } };
};

export const changeEditServiceField = (name, value) => {
  return { type: CHANGE_EDIT_SERVICE_FIELD, payload: { name, value } };
};

export const resetEditForm = () => {
  return { type: RESET_EDIT_FORM };
};

export const changeModalState = (isOpen) => {
  return { type: CHANGE_MODAL_STATE, payload: { isOpen } };
};

export const fillEditForm = (data) => {
  return { type: FILL_EDIT_FORM, payload: { ...data } };
};

export const fetchServicesRequest = () => {
  return { type: FETCH_SERVICES_REQUEST };
};

export const fetchServicesSuccess = (items) => {
  return { type: FETCH_SERVICES_SUCCESS, payload: { items } };
};

export const fetchServicesFailure = (error) => {
  return { type: FETCH_SERVICES_FAILURE, payload: { error } };
};

export const addServiceRequest = () => {
  return { type: ADD_SERVICE_REQUEST };
};

export const addServiceSuccess = () => {
  return { type: ADD_SERVICE_SUCCESS };
};

export const addServiceFailure = (error) => {
  return { type: ADD_SERVICE_FAILURE, payload: { error } };
};

export const fetchServices = async (dispatch) => {
  console.log(1);
  dispatch(fetchServicesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVICES}`);
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    console.log('error');
    dispatch(fetchServicesFailure(e.message));
  }
};

export const fetchAddService = async (dispatch, item) => {
  dispatch(addServiceRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVICES}`, {
      method: 'POST',
      body: JSON.stringify(item),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    dispatch(addServiceSuccess());
    dispatch(addService(data));
  } catch (e) {
    console.log(e.message);
    dispatch(addServiceFailure(e.message));
  }
};

export const fetchRemoveService = async (dispatch, id) => {
  const response = await fetch(`${process.env.REACT_APP_SERVICES}/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(removeService(id));
  }
};
