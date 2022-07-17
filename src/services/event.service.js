import axios from 'axios';

const API_URL = "localhost:8000/api/event/";

class EventService {
    retrieve(event) {
        const headers = {
            authorization: 'Basic ' + btoa(event.username + ':' + event.password)
        };
        return axios.get(API_URL + "retrieve", {headers: headers})
            .then(resp => {
                return resp.data;
            });
    };

    create(event) {
        return axios.post(API_URL, event);
    }

};

export default new EventService();