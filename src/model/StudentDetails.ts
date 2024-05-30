interface Courses {
    course: string,
    fee: number
}
interface StudentsProtocol {
    // list: string[]
    studentName: string
    studentId: number
    enrolledCourses: Courses[]

    // add(): void

}
export default class StudentDetails implements StudentsProtocol {
    static indexOf: any

    constructor
        (
            private _studentName: string,
            private _studentId: number,
            private _enrolledCourses: Courses[]
        ) {

    }
    get studentName() {
        return this._studentName
    }
    set studentName(studentName: string) {
        this._studentName = studentName
    }
    get studentId() {
        return this._studentId
    }
    set studentId(studentId: number) {
        this._studentId = studentId
    }
    get enrolledCourses() {
        return this._enrolledCourses
    }
    set enrolledCourses(enrolledCourses: Courses[]) {
        this._enrolledCourses = enrolledCourses
    }

}
