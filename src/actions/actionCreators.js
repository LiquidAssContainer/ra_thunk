import {
  ADD_SERVICE,
  REMOVE_SERVICE,
  GET_SERVICE,
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
  EDIT_SERVICE_REQUEST,
  EDIT_SERVICE_SUCCESS,
  EDIT_SERVICE_FAILURE,
} from './actionTypes';

export const addService = (item) => {
  return { type: ADD_SERVICE, payload: item };
};

export const removeService = (id) => {
  return { type: REMOVE_SERVICE, payload: { id } };
};

export const getService = ({ id, name, price, content }) => {
  return { type: GET_SERVICE, payload: { id, name, price, content } };
};

export const editService = ({ id, name, price, content }) => {
  return { type: EDIT_SERVICE, payload: { id, name, price, content } };
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

export const editServiceRequest = () => {
  return { type: EDIT_SERVICE_REQUEST };
};

export const editServiceSuccess = () => {
  return { type: EDIT_SERVICE_SUCCESS };
};

export const editServiceFailure = (error) => {
  return { type: EDIT_SERVICE_FAILURE, payload: { error } };
};

export const fetchService = async (dispatch, id) => {
  try {
    const data = await getResponse({
      url: `${process.env.REACT_APP_SERVICES}/${id}`,
    });
    dispatch(getService(data));
    dispatch(fillEditForm(data));
  } catch (e) {
    console.log(e.message);
  }
};

export const fetchServices = async (dispatch) => {
  dispatch(fetchServicesRequest());
  try {
    const data = await getResponse({ url: process.env.REACT_APP_SERVICES });
    dispatch(fetchServicesSuccess(data));
  } catch (e) {
    console.log(e.message);
    dispatch(fetchServicesFailure(e.message));
  }
};

export const fetchAddService = async (dispatch, item, history) => {
  dispatch(addServiceRequest());
  try {
    const data = await getResponse({
      url: process.env.REACT_APP_SERVICES,
      method: 'POST',
      data: item,
    });
    dispatch(addServiceSuccess());
    dispatch(addService(data));
    dispatch(resetEditForm());
    history.push('/services');
    dispatch(changeModalState(false));
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }
};

export const fetchEditService = async (dispatch, item, history) => {
  dispatch(editServiceRequest());
  try {
    const data = await getResponse({
      url: `${process.env.REACT_APP_SERVICES}/${item.id}`,
      method: 'PUT',
      data: item,
    });
    dispatch(editServiceSuccess());
    dispatch(editService(data));
    dispatch(resetEditForm());
    history.push('/services');
    dispatch(changeModalState(false));
  } catch (e) {
    dispatch(editServiceFailure(e.message));
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

async function getResponse({ url, method, data }) {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
