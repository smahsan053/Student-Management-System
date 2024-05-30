export default class StudentDetails {
    _studentName;
    _studentId;
    _enrolledCourses;
    static indexOf;
    constructor(_studentName, _studentId, _enrolledCourses) {
        this._studentName = _studentName;
        this._studentId = _studentId;
        this._enrolledCourses = _enrolledCourses;
    }
    get studentName() {
        return this._studentName;
    }
    set studentName(studentName) {
        this._studentName = studentName;
    }
    get studentId() {
        return this._studentId;
    }
    set studentId(studentId) {
        this._studentId = studentId;
    }
    get enrolledCourses() {
        return this._enrolledCourses;
    }
    set enrolledCourses(enrolledCourses) {
        this._enrolledCourses = enrolledCourses;
    }
}
