import formatDate from "../formatDate";
import Course from "./CourseClass";
import User from "./UserClass";

export default class Class {
    constructor(data) {
        this.id = data.id;
        this.courseId = data.courseId;
        this.teacherId = data.teacherId;
        this.name = data.name;
        this.schedule = data.schedule;
        this.startDate = new Date(data.startDate);
        this.endDate = new Date(data.endDate);
        this.status = data.status;
        this.progress = data.progress;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
        this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
        this.revision = data.revision;
        this.course = data.course ? new Course(data.course) : null;
        this.teacher = data.teacher ? new User(data.teacher) : null;
    }

    get formattedStart() {
        return formatDate(this.startDate);
    }
    get formattedEnd() {
        return formatDate(this.endDate);
    }

    get formattedCreatedAt() {
        return formatDate(this.createdAt);
    }

    get formattedUpdatedAt() {
        return formatDate(this.updatedAt);
    }

    get formattedDeletedAt() {
        return this.deletedAt ? formatDate(this.deletedAt) : "";
    }
}