export class Event {
    constructor(date, status, title, description, username, password, id) {
        this.date = date;
        this.title = title;
        this.description = description;
        this.status = status;
        this.username = username;
        this.password = password;
        this.id = id;
    }
}