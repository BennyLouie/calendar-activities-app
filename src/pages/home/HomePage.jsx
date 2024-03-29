import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventCard from '../../components/EventCard';
import './HomePage.css';
import { Event } from '../../models/event';
import EventService from '../../services/event.service';
import UserService from '../../services/user.service';

const HomePage = props => {

    if (!UserService.currentUserValue) {
        props.history.push('/login');
        return;
    }

    const EventCalendar = props => {
        const user = useState(UserService.currentUserValue)[0];
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const [date, setDate] = useState(new Date());
        const [events, setEvents] = useState([]);
        const [event, setEvent] = useState(new Event(user.id, date, "Incomplete"));
        const [submitted, setSubmitted] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
    
        const onChange = date => {
            setDate(date);
            event.date = date.toISOString().split("T")[0];
        }

        const retrieveEvents = () => {
            EventService.retrieveEvents(user).then(resp => {
                setEvents(resp);
            });
        };

        const handleChange = e => {
            const { name, value } = e.target;
            setEvent(prevState => {
                return {
                    ...prevState,
                    [name]: value
                }
            })
            // console.log(event)
        };
    
        const handleCreate = e => {
            e.preventDefault();
            setSubmitted(true);
            console.log(event)
            console.log(new Date().toISOString().split("T")[0])
            EventService.create(event)
                .then(data => {
                    props.history.push('/home');
                }, error => {
                    console.log(error);
                    setErrorMessage('Invalid Event');
                });
        };
        
        return (
            <div>
                {/* {console.log(user)} */}
                <div>
                    <Calendar onChange={onChange} value={date}/>
                    {/* {console.log(date)} */}
                    {date.toString()}
                    {/* {console.log(event)} */}
                </div>
                <div className="events">
                    <div className="events-list">
                        {retrieveEvents()}
                        {events.map( event => (
                            <EventCard event={event}/>
                        ))}
                    </div>
                    <div className="form-container">
                        <div className="card custom-card">
                            {errorMessage &&
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                            }

                            <form onSubmit={(e) => handleCreate(e)}
                                noValidate
                                className={submitted ? 'was-validated' : ''}
                            >
                                <div className="form-group">
                                    <label htmlFor="date">Date</label>
                                    <input type="text" 
                                        className="form-control" 
                                        name="date" 
                                        required 
                                        placeholder='Date' 
                                        value={date.toISOString().split("T")[0]}
                                        readOnly/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">Title</label>
                                    <input type="text" 
                                        className="form-control" 
                                        name="title" 
                                        required 
                                        placeholder='Title' 
                                        value={event.title}
                                        onChange={(e => handleChange(e))}/>
                                    <div className="invalid-feedback">
                                        Title is required.
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" 
                                        className="form-control" 
                                        name="description" 
                                        required 
                                        placeholder='Description' 
                                        value={event.description}
                                        onChange={(e => handleChange(e))}/>
                                    <div className="invalid-feedback">
                                        Description is required.
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select name="status" id="status" defaultValue={'Incomplete'} onChange={(e => handleChange(e))}>
                                        <option value="Incomplete">Incomplete</option>
                                        <option value="Complete">Complete</option>
                                    </select>
                                </div>

                                <button className="btn btn-success w-100 mt-3">
                                            Create Event
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
        
    }

    return(
        <EventCalendar />        
    );
};

export {HomePage};