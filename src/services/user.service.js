import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const API_URL = "localhost:8000/api/user/";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem("currentUser")));

class UserService {
     get currentUserValue() {
        return currentUserSubject.value;
     };

     get currentUser() {
        return currentUserSubject.asObservable();
     };

    login(user) {
        //btoa: Basic64 encryption
        const headers = {
            authorization: 'Basic ' + btoa(user.username + ':' + user.password)
        };
        return axios.get(API_URL + 'login', {headers: headers})
        .then(resp => {
            resp.data.password = user.password; //Store pure password
            localStorage.setItem('currentUser', JSON.stringify(resp.data));
            currentUserSubject.next(resp.data);
        });
    }; 

    logout() {
        return axios.post(API_URL + 'logout', {})
        .then(() => {
            localStorage.removeItem('currentUser');
            currentUserSubject.next(null);
        });
    };

    register(user) {
        return axios.post(API_URL, user);
    }
};

export default new UserService();