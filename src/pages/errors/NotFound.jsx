import {Component} from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <span className="display-1">
                            404
                        </span>
                        <div className="mb-4 lead">
                            Opps! We can't seem to find the page you are looking for.
                        </div>
                        <Link className="btn btn-link" to="/login">Back to Home</Link>
                    </div>
                </div>
            </div>
        );
    }
};

export {NotFound};