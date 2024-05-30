export default class StudentsList {
    static instance = new StudentsList();
    _list;
    _balance;
    constructor(list = [], balance = 0) {
        this._list = list;
        this._balance = balance;
    }
    get list() {
        return this._list;
    }
    get balance() {
        return this._balance;
    }
    set balance(payment) {
        this._balance = payment;
    }
    add(student) {
        this._list.push(student);
    }
    displayStudents() {
        return this._list.map(student => student.studentName);
    }
    displayCourses(studentName) {
        const details = this._list.filter(student => student.studentName === studentName);
        details.forEach(element => console.log(element.enrolledCourses.map(course => `\t - ${course.course} {$${course.fee}}`).join('\n')));
    }
    displayDetails(studentName) {
        const details = this._list.filter(student => student.studentName === studentName);
        details.forEach(element => {
            const name = element.studentName;
            const id = element.studentId;
            const enrolledCourses = element.enrolledCourses.map(course => `Course: ${course.course} (Fee: $${course.fee})`).join(', ');
            const courses = element.enrolledCourses.map(course => course.course);
            const tutionFees = element.enrolledCourses.map(course => course.fee).reduce((acc, curr) => acc + curr, 0);
            const balance = this.balance;
            console.log(`\t NAME: ${name}`);
            console.log(`\t ID: ${id}`);
            console.log(`\t ENROLLED COURSES: ${enrolledCourses}`);
            console.log(`\t COURSES: ${courses}`);
            console.log(`\t TUTION FEES: ${tutionFees}`);
            console.log(`\t PAYMENT STATUS: ${balance === 0 ? 'CLEARED' : balance === tutionFees ? 'DUES ARE STILL PENDING' : 'PARTIAL PAYMENT DONE'} \n\t BALANCE: $${balance}`);
            console.log(`\t CERTIFICATE ELIGIBILITY: ${balance === 0 ? 'YES' : 'NO'}`);
        });
    }
    tutionFee(studentName) {
        const details = this._list.filter(student => student.studentName === studentName);
        const tutionFee = details.flatMap(element => element.enrolledCourses.map(course => course.fee)).reduce((acc, curr) => acc + curr, 0);
        this.balance = tutionFee;
        return tutionFee;
    }
    feePayment(studentName, feeAmount) {
        const totalTutionFee = this.tutionFee(studentName);
        const payment = totalTutionFee - feeAmount;
        this.balance = payment;
        return payment;
    }
}
