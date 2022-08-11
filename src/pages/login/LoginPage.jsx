import {Component} from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../models/user';
import UserService from '../../services/user.service';
import './LoginPage.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        // if (UserService.currentUserValue) {
        //     this.props.history.push('/home');
        //     return;
        // }

        this.state = {
            user: new User('', ''),
            submitted: false,
            loading: false,
            errorMessage: ''
        }
    };

    //e: Event has value, name fields => <Input value="" name=""/>
    handleChange(e) {
        const {name, value} = e.target;
        const {user} = this.state;

        //E.g. <Input value="abc" name="username"/> => user[username] = abc
        user[name] = value;
        this.setState({user: user});
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({submitted: true}); //form is submitted
        const {user} = this.state;

        //Validation
        if (!user.username || !user.password) {
            return;
        }

        this.setState({loading: true}); //Operation has started, please wait...

        UserService.login(user)
        .then(data => {
            //Operation completed successfully
            this.props.history.push('/home');
        }, error => {
            console.log(error);
            this.setState({
                errorMessage: "Username or Password is invalid.",
                loading: false
            });
        })
    }

    render() {
        const {errorMessage, submitted, user, loading} = this.state;
        return(
            <div className="form-container">
                <div className="card custom-card">
                    <div className="header-container">
                        <i className="fa fa-user"/>
                    </div>

                    {errorMessage &&
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                    }

                    <form onSubmit={(e) => this.handleLogin(e)}
                          noValidate
                          className={submitted ? 'was-validated' : ''}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" 
                                   className="form-control" 
                                   name="username" 
                                   required 
                                   placeholder='Username' 
                                   value={user.username}
                                   onChange={(e => this.handleChange(e))}/>
                            <div className="invalid-feedback">
                                A valid username is required.
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Password</label>
                            <input type="text" 
                                   className="form-control" 
                                   name="password" 
                                   required 
                                   placeholder='Password' 
                                   value={user.password}
                                   onChange={(e => this.handleChange(e))}/>
                            <div className="invalid-feedback">
                                Password is required.
                            </div>
                        </div>

                        <button className="btn btn-success w-100 mt-3"
                                disabled={loading}>
                                    Sign In
                        </button>
                    </form>

                    <Link to="/register" className="btn btn-link" style={{color: 'darkgray'}}>
                        Create New Account!
                    </Link>
                </div>
            </div>
        );
    }
};

export {LoginPage};