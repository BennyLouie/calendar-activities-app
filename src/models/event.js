export class Event {
    constructor(date, status, title, description, userid, id) {
        this.date = date;
        this.title = title;
        this.description = description;
        this.status = status;
        this.userid = userid
        this.id = id;
    }
}