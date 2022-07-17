import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const HomePage = props => {
    

    const EventCalendar = props => {
        const [date, setDate] = useState(new Date());
    
        const onChange = date => {
            setDate(date);
        }
        
        return (
            <div>
                <Calendar onChange={onChange} value={date} />
                {console.log(date)}
                {date.toString()}
            </div>
        );
        
    }

    return(
        <EventCalendar />        
    );
};

export {HomePage};