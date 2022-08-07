import { Component } from 'react';
// import { Event } from '../models/event';

export default class EventCard extends Component {
    render() {
        return (
            <div className="event">
                <div>
                    {console.log(this.props.event)}
                    <span>{this.props.event.id}</span>
                    <p>{this.props.event.title}</p>
                </div>
            </div>
        );
    }
};