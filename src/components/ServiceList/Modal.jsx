import { useDispatch } from 'react-redux';
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
          <button className="modal_close-btn" onClick={onClose}>
            ×
          </button>
          {children}
        </div>
      </div>
    )
  );
};
