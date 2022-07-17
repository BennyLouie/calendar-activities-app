import {Component} from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../models/user';
import UserService from '../../services/user.service';
import './../login/LoginPage.css'; //Uses same CSS as LoginPage

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        if (UserService.currentUserValue) {
            this.props.history.push('/home');
            return;
        }

        this.state = {
            user: new User('', '', ''),
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

    handleRegister(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const user = this.state;

        if (!user.name || !user.username || !user.password) {
            //Not-valid form
            return;
        };

        this.setState({loading: true});

        UserService.register(user).then(data => {
            this.props.history.push('/login');
        }, error => {
            console.log(error);
            if (error?.response?.status === 409) {
                this.setState({
                    errorMessage: "Username is not available",
                    loading: false
                });
            }
            else {
                this.setState({
                    errorMessage: "Unexpected error occurred",
                    loading: false
                })
            }
        });
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

                    <form onSubmit={(e) => this.handleRegister(e)}
                          noValidate
                          className={submitted ? 'was-validated' : ''}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Full Name</label>
                            <input type="text" 
                                   className="form-control" 
                                   name="name" 
                                   required 
                                   placeholder='Full Name' 
                                   value={user.name}
                                   onChange={(e => this.handleChange(e))}/>
                            <div className="invalid-feedback">
                                A full name is required.
                            </div>
                        </div>

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
                                    Sign Up
                        </button>
                    </form>

                    <Link to="/login" className="btn btn-link" style={{color: 'darkgray'}}>
                        I Have an Account!
                    </Link>
                </div>
            </div>
        );
    }
};

export {RegisterPage};