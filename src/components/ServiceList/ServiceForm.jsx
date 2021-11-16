import { useDispatch, useSelector } from 'react-redux';

import {
  changeAddServiceField,
  changeEditServiceField,
  changeModalState,
  editService,
  fetchAddService,
  resetEditForm,
} from '../../actions/actionCreators';
import { ErrorPopup } from './ErrorPopup';
import { LoadingSpinner } from './LoadingSpinner';

export const EditServiceForm = () => {
  const dispatch = useDispatch();

  const onInputChange = (name, value) => {
    dispatch(changeEditServiceField(name, value));
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

  const { loading, error } = useSelector((state) => state.addService);

  const onInputChange = (name, value) => {
    dispatch(changeAddServiceField(name, value));
  };

  const onFormSubmit = ({ name, price, content }) => {
    if (name && price && content) {
      fetchAddService(dispatch, { name, price, content });
      dispatch(resetEditForm());
    } else {
      console.log('Тут должна быть какая-нибудь модалка или попап');
    }
  };

  return loading ? (
    <LoadingSpinner radius="20" width="5" color="rgb(210, 70, 75)" />
  ) : error ? (
    <ErrorPopup message={error} />
  ) : (
    <ServiceForm
      type="add"
      onInputChange={onInputChange}
      onFormSubmit={onFormSubmit}
    />
  );
};

const ServiceForm = ({ type, onInputChange, onFormSubmit }) => {
  const formData = useSelector((state) => state[`${type}Service`].service);

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
        type="text"
      />
      <FormInput
        label="Price"
        name="price"
        inputValue={formData.price}
        onInputChange={onInputChange}
        type="number"
      />
      <FormInput
        label="Description"
        name="content"
        inputValue={formData.content}
        onInputChange={onInputChange}
        type="text"
      />
      <button type="submit" className="form_submit">
        Save
      </button>
    </form>
  );
};

const FormInput = ({ name, label, inputValue, onInputChange, type }) => {
  const onChange = ({ target: { value } }) => {
    // для цены, костыль на скорую руку
    const inputValue = type === 'number' ? +value : value;
    onInputChange(name, inputValue);
  };

  return (
    <label className="form_label">
      <span className="form_label_text">{label}</span>
      <input
        onChange={onChange}
        className="form_input"
        value={inputValue}
        type={type}
      />
    </label>
  );
};
