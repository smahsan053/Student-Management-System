import StudentDetails from "./StudentDetails.js";

interface ListProtocol {
    list: StudentDetails[];
    balance: number;
    add(student: StudentDetails): void;
    displayStudents(): string[] | void;
    displayCourses(studentName: string): void;
    displayDetails(studentName: string): void;
    tutionFee(studentName: string): number;
    feePayment(studentName: string, feeAmount: number): number;
}

export default class StudentsList implements ListProtocol {
    static instance: StudentsList = new StudentsList();
    private _list: StudentDetails[];
    private _balance: number;

    constructor(list: StudentDetails[] = [], balance: number = 0) {
        this._list = list;
        this._balance = balance;
    }

    get list() {
        return this._list;
    }

    get balance(): number {
        return this._balance;
    }

    set balance(payment: number) {
        this._balance = payment
    }

    add(student: StudentDetails): void {
        this._list.push(student);
    }

    displayStudents(): string[] | void {
        return this._list.map(student => student.studentName);
    }

    displayCourses(studentName: string): void {
        const details = this._list.filter(student => student.studentName === studentName);
        details.forEach(element => console.log(element.enrolledCourses.map(course => `\t - ${course.course} {$${course.fee}}`).join('\n')));
    }

    displayDetails(studentName: string): void {
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

    tutionFee(studentName: string): number {
        const details = this._list.filter(student => student.studentName === studentName);
        const tutionFee = details.flatMap(element => element.enrolledCourses.map(course => course.fee)).reduce((acc, curr) => acc + curr, 0);
        this.balance = tutionFee
        return tutionFee
    }

    feePayment(studentName: string, feeAmount: number): number {
        const totalTutionFee = this.tutionFee(studentName);
        const payment = totalTutionFee - feeAmount;
        this.balance = payment;
        return payment;
    }
}
