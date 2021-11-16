import { useSelector } from 'react-redux';
import { AddServiceForm, EditServiceForm } from './components/ServiceList/ServiceForm';
import { FilterServices } from './components/ServiceList/FilterServices';
import { Modal } from './components/ServiceList/Modal';
import { ServiceList } from './components/ServiceList/ServiceList';
import './styles/app.css';

export const App = () => {
  const { services, filtered } = useSelector((state) => state.serviceList);
  const { isOpen } = useSelector((state) => state.editModal);

  return (
    <div className="services-app">
      <AddServiceForm />
      <FilterServices />
      <ServiceList services={filtered || services} />
      <Modal isOpen={isOpen}>
        <EditServiceForm />
      </Modal>
    </div>
  );
};
