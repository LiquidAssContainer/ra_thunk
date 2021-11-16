import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { filterServices } from '../../actions/actionCreators';

export const FilterServices = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  const onChange = ({ target: { value } }) => {
    setValue(value);
    dispatch(filterServices(value));
  };

  return (
    <div className="filter-services">
      <label className="filter-services_label">
        <span className="filter-services_text">Искать</span>
        <input
          type="text"
          className="filter-services_input"
          onChange={onChange}
          value={value}
        />
      </label>
    </div>
  );
};
