import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import {
  changeAddServiceField,
  fetchAddService,
} from '../../actions/actionCreators';

import { ServiceForm } from './ServiceForm';
import { ErrorPopup } from '../ServiceList/ErrorPopup';

export const AddServiceForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.addService);

  const onInputChange = (name, value) => {
    dispatch(changeAddServiceField(name, value));
  };

  const onFormSubmit = ({ name, price, content }) => {
    if (name && price && content) {
      fetchAddService(dispatch, { name, price, content }, history);
    } else {
      console.log('Тут должна быть какая-нибудь модалка или попап');
    }
  };

  return (
    <>
      <ServiceForm
        type="add"
        onInputChange={onInputChange}
        onFormSubmit={onFormSubmit}
        isLoading={loading}
      />
      {error && <ErrorPopup message={error} />}
    </>
  );
};
