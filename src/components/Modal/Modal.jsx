import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { resetEditForm } from '../../actions/actionCreators';
import { EditServiceForm } from '../ServiceForm/EditServiceForm';
import { AddServiceForm } from '../ServiceForm/AddServiceForm';

export const AddServiceModal = () => {
  return (
    <Modal isOpen>
      <AddServiceForm />
    </Modal>
  );
};

export const EditServiceModal = ({ match }) => {
  return (
    <Modal isOpen>
      <EditServiceForm id={match.params.id} />
    </Modal>
  );
};

export const Modal = ({ children, isOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef();

  const onClose = () => {
    // довольно костыльно диспатчить это в модалке в отрыве от самой формы
    dispatch(resetEditForm());
    history.push(process.env.REACT_APP_HOMEPAGE);
  };

  useOnClickOutside(ref, onClose);

  return (
    isOpen && (
      <div className="modal_wrapper">
        <div className="modal" ref={ref}>
          <Link to={process.env.REACT_APP_HOMEPAGE}>
            <button className="modal_close-btn" onClick={onClose}>
              ×
            </button>
          </Link>
          {children}
        </div>
      </div>
    )
  );
};
