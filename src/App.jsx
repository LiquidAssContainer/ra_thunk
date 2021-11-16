import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

import {
  AddServiceForm,
  EditServiceForm,
} from './components/ServiceList/ServiceForm';
import { FilterServices } from './components/ServiceList/FilterServices';
import { Modal } from './components/ServiceList/Modal';
import { ServiceList } from './components/ServiceList/ServiceList';
import { LoadingSpinner } from './components/ServiceList/LoadingSpinner';
import { ErrorPopup } from './components/ServiceList/ErrorPopup';

import './styles/app.css';
import { fetchServices } from './actions/actionCreators';

export const App = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector(
    (state) => state.serviceList,
  );

  useEffect(() => {
    fetchServices(dispatch);
  }, [dispatch]);

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
      {loading ? (
        <LoadingSpinner radius="20" width="5" color="rgb(210, 70, 75)" />
      ) : error ? (
        <ErrorPopup message={error} />
      ) : (
        <div className="services-app">
          <AddServiceForm />
          <FilterServices onFilter={onFilter} />
          <ServiceList services={filtered || services} />
          {/* <Switch> */}
            <Route path="/services/:id">
              <Modal isOpen>
                <EditServiceForm />
              </Modal>
            </Route>
          {/* </Switch> */}
        </div>
      )}
    </Router>
  );
};
