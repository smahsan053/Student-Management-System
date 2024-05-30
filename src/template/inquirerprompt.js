import inquirer from "inquirer";
const courses = [
    {
        course: 'Web Development',
        fee: 300
    },
    {
        course: 'Data Science',
        fee: 400
    },
    {
        course: 'Mobile App Development',
        fee: 250
    },
    {
        course: 'Cybersecurity',
        fee: 350
    },
];
const initialize = async () => {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "studentStatus",
            choices: ['New Student', "Existing Student"]
        }
    ]);
    return answer.studentStatus;
};
const confirmation = async () => {
    const answer = await inquirer.prompt([
        {
            type: "confirm",
            name: "studentConfirmation",
            message: "Do you want to register a new student?"
        }
    ]);
    return answer.studentConfirmation;
};
const registration = async () => {
    const studentNameAnswer = await inquirer.prompt({
        type: "input",
        name: "studentName",
        message: "Enter Student Name:"
    });
    const coursesEnrolledAnswer = await inquirer.prompt({
        type: "checkbox",
        name: "coursesEnrolled",
        // choices: ['Web Development', 'Data Science', 'Mobile App Development', 'Cybersecurity'],
        choices: courses.map(course => ({
            name: course.course, // Use course name as the choice name
            value: { course: course.course, fee: course.fee }, // Use course fee as an additional property
            // Add any other properties you need
        })),
        message: `Select Courses ${studentNameAnswer.studentName} is enrolled in:`
    });
    const selectedCourses = coursesEnrolledAnswer.coursesEnrolled.map((course) => ({
        course: course.course,
        fee: course.fee
    }));
    return [studentNameAnswer.studentName, selectedCourses];
};
const existingStudent = async () => {
    const answer = await inquirer.prompt([{
            type: "list",
            name: 'selectOption',
            choices: ['Fee Payment', 'View Status', 'Exit'],
            message: "Select options below to proceed further"
        }]);
    return answer.selectOption;
};
// const paymentConfirmation = async (): Promise<Boolean> => {
//     const answer: PromptResponse = await inquirer.prompt<PromptResponse>(
//         [
//             {
//                 type: "confirm",
//                 name: "paymentConfirmation",
//                 message: "Do you want to proceed for Payment?"
//             }
//         ]
//     )
//     return answer.paymentConfirmation
// }
const paymentAmount = async () => {
    const answer = await inquirer.prompt([
        {
            type: "number",
            name: "paymentAmount",
            message: "How much would you like to pay right now?"
        }
    ]);
    return answer.paymentAmount;
};
const paymentProcedure = async () => {
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "paymentProcedure",
            choices: ['Full Payment', 'Partial Payment'],
            message: "How would you like to proceed?"
        }
    ]);
    return answer.paymentProcedure;
};
export { initialize, confirmation, registration, existingStudent, paymentAmount, paymentProcedure };
