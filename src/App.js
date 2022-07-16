import logo from './logo.svg';
import './App.css';
import {Component} from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { HomePage } from './pages/home/HomePage';
import { NotFound } from './pages/errors/NotFound';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: createBrowserHistory()
    }
  };

  render() {
    const {history} = this.state;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/404" component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
