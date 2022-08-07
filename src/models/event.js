export class Event {
    constructor(userid, date, status, title, description, id) {
        this.date = date;
        this.title = title;
        this.description = description;
        this.status = status;
        this.userid = userid;
        this.id = id;
    }
}