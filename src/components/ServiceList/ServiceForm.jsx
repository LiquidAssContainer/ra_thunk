import { useDispatch, useSelector } from 'react-redux';

import {
  addService,
  changeModalState,
  changeServiceField,
  editService,
  resetForm,
} from '../../actions/actionCreators';

export const EditServiceForm = () => {
  const dispatch = useDispatch();

  const onInputChange = (name, value) => {
    dispatch(changeServiceField('edit', name, value));
  };

  const onFormSubmit = ({ id, name, price }) => {
    if (name && price) {
      dispatch(editService(id, name, price));
      dispatch(changeModalState(false));
    } else {
      console.log('Тут должна быть какая-нибудь модалка или попап');
    }
  };

  return (
    <ServiceForm
      type="edit"
      onInputChange={onInputChange}
      onFormSubmit={onFormSubmit}
    />
  );
};

export const AddServiceForm = () => {
  const dispatch = useDispatch();

  const onInputChange = (name, value) => {
    dispatch(changeServiceField('add', name, value));
  };

  const onFormSubmit = ({ name, price }) => {
    if (name && price) {
      dispatch(addService(name, price));
      dispatch(resetForm('add'));
    } else {
      console.log('Тут должна быть какая-нибудь модалка или попап');
    }
  };

  return (
    <ServiceForm
      type="add"
      onInputChange={onInputChange}
      onFormSubmit={onFormSubmit}
    />
  );
};

const ServiceForm = ({ type, onInputChange, onFormSubmit }) => {
  const formData = useSelector((state) => state.serviceForm[type]);

  const onSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit} className="add-service_form">
      <FormInput
        label="Name"
        name="name"
        inputValue={formData.name}
        onInputChange={onInputChange}
      />
      <FormInput
        label="Price"
        name="price"
        inputValue={formData.price}
        onInputChange={onInputChange}
      />
      <button type="submit" className="form_submit">
        Save
      </button>
    </form>
  );
};

const FormInput = ({ name, label, inputValue, onInputChange }) => {
  const onChange = ({ target: { value } }) => {
    onInputChange(name, value);
  };

  return (
    <label htmlFor="" className="form_label">
      <span className="form_label_text">{label}</span>
      <input
        onChange={onChange}
        type="text"
        className="form_input"
        value={inputValue}
      />
    </label>
  );
};
