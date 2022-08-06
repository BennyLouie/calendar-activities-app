import axios from 'axios';
import { Buffer } from 'buffer';

const USER_API_URL = "http://localhost:8080/api/user/";
const EVENT_API_URL = "http://localhost:8080/api/event/"

//WIP
class EventService {
    retrieveEvents(user) {
        const headers = {
            authorization: 'Basic ' + Buffer.from(user.username + ':' + user.password, 'binary').toString('base64')
        };
        return axios.get(USER_API_URL + user.id + "/events", {headers: headers})
            .then(resp => {
                // console.log(resp.data)
                return resp.data;
            });
    };

    create(event) {
        return axios.post(EVENT_API_URL, event);
    }

};

export default new EventService();