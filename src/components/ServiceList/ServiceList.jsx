import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import { fetchRemoveService } from '../../actions/actionCreators';

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
  const history = useHistory();

  const onRemove = () => {
    fetchRemoveService(dispatch, id);
  };

  const onEdit = () => {
    history.push(process.env.REACT_APP_HOMEPAGE);
  };

  return (
    <li className="service-item">
      <div className="service-item_info">
        <div className="service-item_name">{name}</div>
        <div className="service-item_price">{price} ₽</div>
      </div>
      <div className="service-item_controls">
        <Link to={`${process.env.REACT_APP_HOMEPAGE}/${id}`}>
          <Button onClick={onEdit} label="Edit" />
        </Link>
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
