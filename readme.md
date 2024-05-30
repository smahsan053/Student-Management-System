# Student Enrollment and Fee Management System

This is a command-line application for managing student enrollments and fee payments. It allows you to enroll new students, view student details, and handle fee payments.

## Features

- **Enroll New Student**: Register a new student and their courses.
- **Fee Payment**: Manage fee payments for existing students.
- **View Status**: View the status and details of enrolled students.
- **Exit**: Exit the application.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install) package manager

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/student-enrollment-system.git
    cd student-enrollment-system
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Make the script executable:
    ```sh
    chmod +x ./index.js
    ```

## Usage

To run the application, use the following command:
```sh
./index.js

You will be prompted with a menu to choose an option for managing students and their fee payments.

File Structure
index.js: The main entry point of the application.
model/StudentDetails.js: Contains the StudentDetails class for managing individual student details.
model/StudentsList.js: Contains the StudentsList singleton class for managing the list of students.
template/inquirerprompt.js: Contains the inquirer prompts for user interaction.

chalk: Used for colorful console output.
inquirer: Used for interactive command-line prompts.
model/StudentDetails.js: Contains the StudentDetails class.
model/StudentsList.js: Contains the StudentsList singleton class.
template/inquirerprompt.js: Contains the inquirer prompts.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request. We welcome all contributions!

