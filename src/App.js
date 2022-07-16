import logo from './logo.svg';
import './App.css';
import {Component} from 'react';

import {Router, NavLink, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { LoginPage } from './pages/login/LoginPage';
import { RegisterPage } from './pages/register/RegisterPage';
import { HomePage } from './pages/home/HomePage';
import { NotFound } from './pages/errors/NotFound';
import UserService from './services/user.service'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: createBrowserHistory(),
      currentUser: null
    }
  };

  componentDidMount() {
    UserService.currentUser.subscribe(data => {
      this.setState({currentUser: data});
    });
  };

  logout() {
    UserService.logout().then(data => {
      //successful 
      this.state.history.push('/login');
    }, error => {
      console.log(error);
      this.setState({errorMessage: "Unexpected error occurred."});
    });
  };

  render() {
    const {history, currentUser} = this.state;
    return (
      <Router history={history}>

        <div>
          <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <a href="https://reactjs.org" className='navbar-brand ms-1'>
              <img src={logo} alt="" className="App-logo"/>
              React
            </a>

            <div className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home" activeClassName="active">
                  <span className="fa fa-home"/>
                  Home
                </NavLink>
              </li>
            </div>

            {
              !currentUser &&
              <div className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register" activeClassName="active">
                    <span className="fa fa-user-plus"/>
                    Sign Up
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" activeClassName="active">
                    <span className="fa fa-sign-in"/>
                    Sign In
                  </NavLink>
                </li>
              </div>
            }

            {
              currentUser &&
              <div className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile" activeClassName="active">
                    <span className="fa fa-user"/>
                    {currentUser.name}
                  </NavLink>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={() => this.logout()}>
                    <span className="fa fa-sign-out"/>
                    LogOut
                  </a>
                </li>
              </div>
            }
          </nav>
        </div>

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
