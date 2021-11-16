import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeModalState } from '../../actions/actionCreators';

export const Modal = ({ children, isOpen }) => {
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(changeModalState(false));
  };

  return (
    isOpen && (
      <div className="modal_wrapper">
        <div className="modal">
          <Link to="/services">
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
