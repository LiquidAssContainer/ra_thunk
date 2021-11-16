import { useDispatch } from 'react-redux';

import {
  changeModalState,
  fillEditForm,
  removeService,
} from '../../actions/actionCreators';

export const ServiceList = ({ services }) => {
  return (
    <ul className="service-list">
      {services.map((service, i) => (
        <ServiceItem {...service} key={i} />
      ))}
    </ul>
  );
};

const ServiceItem = ({ name, price, id }) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(removeService(id));
  };

  const onEdit = () => {
    dispatch(fillEditForm({ name, price, id }));
    dispatch(changeModalState(true));
  };

  return (
    <li className="service-item">
      <div className="service-item_info">
        <div className="service-item_name">{name}</div>
        <div className="service-item_price">{price}</div>
      </div>
      <div className="service-item_controls">
        <Button onClick={onEdit} label="Edit" />
        <Button onClick={onRemove} label="Remove" />
      </div>
    </li>
  );
};

const Button = ({ onClick, label }) => {
  return (
    <button onClick={onClick} className="service-item_btn">
      {label}
    </button>
  );
};
