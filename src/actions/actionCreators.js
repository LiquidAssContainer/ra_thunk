import {
  ADD_SERVICE,
  REMOVE_SERVICE,
  EDIT_SERVICE,
  CHANGE_SERVICE_FIELD,
  RESET_FORM,
  CHANGE_MODAL_STATE,
  FILL_EDIT_FORM,
} from './actionTypes';

export const addService = (name, price) => {
  return { type: ADD_SERVICE, payload: { name, price } };
};

export const removeService = (id) => {
  return { type: REMOVE_SERVICE, payload: { id } };
};

export const editService = (id, name, price) => {
  return { type: EDIT_SERVICE, payload: { id, name, price } };
};

export const changeServiceField = (formType, name, value) => {
  return { type: CHANGE_SERVICE_FIELD, payload: { name, value, formType } };
};

export const resetForm = (formType) => {
  return { type: RESET_FORM, payload: { formType } };
};

export const changeModalState = (isOpen) => {
  return { type: CHANGE_MODAL_STATE, payload: { isOpen } };
};

export const fillEditForm = (data) => {
  return { type: FILL_EDIT_FORM, payload: { ...data } };
};
