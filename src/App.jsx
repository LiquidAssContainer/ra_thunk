import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import {
  AddServiceForm,
  EditServiceForm,
} from './components/ServiceList/ServiceForm';
import { FilterServices } from './components/ServiceList/FilterServices';
import { Modal } from './components/ServiceList/Modal';
import { ServiceList } from './components/ServiceList/ServiceList';

import './styles/app.css';

export const App = () => {
  const { services } = useSelector((state) => state.serviceList);
  const { isOpen } = useSelector((state) => state.editModal);
  const [filtered, setFiltered] = useState('');

  const filterByString = (string, services) => {
    return services.filter((service) =>
      service.name.toLowerCase().includes(string.toLowerCase()),
    );
  };

  const onFilter = (string) => {
    const filteredServices = filterByString(string, services);
    setFiltered(filteredServices);
  };

  return (
    <Router>
      <Route exact path="/">
        <Redirect to="/services" />
      </Route>
      <div className="services-app">
        <AddServiceForm />
        <FilterServices onFilter={onFilter} />
        <ServiceList services={filtered || services} />
        <Route path="/services/add">
          <Modal isOpen={isOpen}>
            <EditServiceForm />
          </Modal>
        </Route>
      </div>
    </Router>
  );
};
