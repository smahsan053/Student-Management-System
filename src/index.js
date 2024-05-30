import inquirer from "inquirer";
import StudentDetails from "./model/StudentDetails.js";
import StudentsList from "./model/StudentsList.js";
import { initialize, confirmation, registration, existingStudent, paymentAmount, paymentProcedure } from "./template/inquirerprompt.js";
const Studentslist = StudentsList.instance;
const newStudentEnrollment = async () => {
    const studentConfirmation = await confirmation();
    if (studentConfirmation === true) {
        const [studentName, enrolledCourses] = await registration();
        const newStudent = new StudentDetails(studentName, 1, enrolledCourses);
        Studentslist.add(newStudent);
        console.log(`${studentName} has been enrolled in following courses:`);
        `${enrolledCourses.forEach(course => {
            console.log(`- ${course.course}: $${course.fee}`);
        })}`;
        console.log('*'.repeat(100));
        console.log(`\t Please proceed below with Existing Student to complete the fee payment process `);
        console.log('*'.repeat(100));
        return newStudent;
    }
    else {
        // console.log(`Exiting...`);
        return `Exiting...`;
    }
};
const existingStudentsProcess = async () => {
    const existingStudents = Studentslist.displayStudents();
    let selectedOption = await existingStudent();
    let amount = undefined;
    let tutionFee = undefined;
    while (selectedOption) {
        if (selectedOption === 'Fee Payment') {
            if (typeof existingStudents === "object" && existingStudents.length > 0) {
                const answer = await inquirer.prompt([{
                        type: "list",
                        name: "existingStudents",
                        choices: existingStudents,
                        message: 'Select Student to View Fee Structure:'
                    }]);
                tutionFee = Studentslist.tutionFee(answer.existingStudents);
                console.log(`${answer.existingStudents} is registered in:`);
                Studentslist.displayCourses(answer.existingStudents);
                console.log(`Total Fees Due:`);
                console.log(`\t $${tutionFee}`);
                const paymentProcess = await paymentProcedure();
                if (paymentProcess === 'Full Payment') {
                    amount = tutionFee;
                    console.log(`$${amount} has been deducted from your account`);
                    console.log(`\t ${answer.existingStudents} Paid: $${amount},\n\t Balance:$${Studentslist.feePayment(answer.existingStudents, amount)} \n `);
                    console.log(`${answer.existingStudents} has cleared all of his due now & is eligible for certificate`);
                    selectedOption = await existingStudent();
                }
                else {
                    amount = await paymentAmount();
                    let payment = Studentslist.feePayment(answer.existingStudents, amount);
                    if (payment === 0) {
                        console.log(`$${amount} has been deducted from your account`);
                        console.log(`\t ${answer.existingStudents} Paid: $${amount},\n\t Balance:$${Studentslist.feePayment(answer.existingStudents, amount)} \n `);
                        console.log(`${answer.existingStudents} has cleared all of his due now & is eligible for certificate`);
                        selectedOption = await existingStudent();
                    }
                    else {
                        console.log(`$${amount} has been deducted from your account`);
                        console.log(`\t ${answer.existingStudents} Paid: $${amount},\n\t Balance:$${Studentslist.feePayment(answer.existingStudents, amount)} \n `);
                        console.log(`Clear Dues before completition of course otherwise certificate will not be issued`);
                        selectedOption = await existingStudent();
                    }
                }
            }
            else {
                return 'No students exist';
            }
        }
        else if ((selectedOption === 'View Status')) {
            if (typeof existingStudents === "object" && existingStudents.length > 0) {
                const answer = await inquirer.prompt([{
                        type: "list",
                        name: "existingStudents",
                        choices: existingStudents,
                        message: 'Select Student to View Status Here:'
                    }]);
                if (amount === undefined) {
                    Studentslist.tutionFee(answer.existingStudents);
                }
                else {
                    Studentslist.feePayment(answer.existingStudents, amount);
                }
                console.log(`\n STUDENT STATUS`);
                Studentslist.displayDetails(answer.existingStudents);
                selectedOption = await existingStudent();
            }
            else {
                return 'No students exist';
            }
        }
        else {
            console.log('Exiting');
            break;
        }
    }
};
const initApp = async () => {
    let studentStatus = await initialize();
    while (studentStatus === "New Student") {
        let newStudent = await newStudentEnrollment();
        if (typeof newStudent === 'string')
            return console.log(newStudent);
        studentStatus = await initialize();
    }
    const selectedOption = await existingStudentsProcess();
    if (typeof selectedOption === 'string')
        return console.log(selectedOption);
};
initApp();
