import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import ExpensePage from './pages/ExpensesPage';

import { loadUser } from './redux/actions/auth';

const App = () => {
  useEffect(() => {
    console.log(localStorage.token);
    if (localStorage.token) {
      axios.defaults.headers.common['Authorization'] = localStorage.token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <NavBar />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/expense' component={ExpensePage} />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
};

export default App;
