````md
# Online Examination System

## Overview

This project depicts a simple rendition of a grading system, accessible by both faculty and students.
Each user engages with an interface based on their own user type.

---

## Features

- User registration and login
- Teacher and student roles
- Exam creation and management
- Multiple-choice questions
- Automatic grading
- Student results
- Teacher results overview
- Local storage persistence

---

# Project Structure

```text
Web_dev_final/
│
├── css/
│   └── style.css
│
├── pages/
│   ├── register.html
│   ├── login.html
│   ├── teacher-dashboard.html
│   ├── student-dashboard.html
│   ├── exam-details.html
│   ├── take-exam.html
│   └── results.html
│
├── js/
│   ├── controllers/
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── main.js
│
├── index.html
└── README.md
````

---

# Architecture

The architecture is relatively simple and follows the pipeline below.
The responsibilities of each section will be described in their repective sections.

```text
HTML Page
     │
     ▼
Controller
     │
     ▼
Service
     │
     ▼
StorageService
     │
     ▼
localStorage
```

---

# Modules

## Models

Models are essentially the basic data structs/classes of our program.
In our case a model is simply a collection of data, rather than a full fledged class.

* User
* Teacher
* Student
* Exam
* Question
* AnswerOption
* Result

---

## Controllers
Controllers are essentially the logic maitnance layer of each page.
Each controller is in charge of data collection, even handling, logging and so on.

* registerController
* loginController
* teacherDashboardController
* studentDashboardController
* examDetailsController
* takeExamController
* resultsController

---

## Services
A service is basically an API for interaction with the database, in our case it is the built-in local storage.
Each service is in charge of fetching, updating, adding/removing, their own respective data collection within the local storage.

* AuthService
* ExamService
* ResultService
* StorageService

---

## Utilities
The utilities section contains all general data that can be used by different parts of the project.
The main idea is to maintain uniformity. 

* storageKeys

---

# User Roles

## Teacher

* Create exams
* Edit exams
* Delete exams
* Manage questions
* Manage answer options
* View student results

## Student

* Register and log in
* Browse available exams
* Take exams
* View personal results

---

# Technologies

* HTML5
* CSS3
* JavaScript (ES6 Modules)
* LocalStorage

---

### Installation

This project does not require any external dependencies or a build process. It is a client-side web application that runs entirely in the browser using JavaScript modules and the browser's Local Storage.

1. Clone the repository.

```bash
git clone <repository-url>
```

2. Open the project folder.

3. Launch the project using **Live Server** (recommended) or any other local web server.

4. Open the generated URL in your browser.

---

### Application Flow

The application provides two different workflows depending on the authenticated user's role.

#### Teacher

```text
Login
   ↓
Teacher Dashboard
   ↓
Create / Manage Exams
   ↓
Student Takes Exam
   ↓
View Results
```

Teachers are responsible for creating and maintaining examinations. They can add questions, define the correct answers, edit existing exams, and review the results submitted by students.

#### Student

```text
Login
   ↓
Student Dashboard
   ↓
Choose Exam
   ↓
Take Exam
   ↓
Submit
   ↓
View Results
```

Students can browse the available examinations, complete them, receive an automatic grade upon submission, and review their previous results.

---

# Data Storage

The application stores all information using the browser's `localStorage`.

Collections include:

* Users
* Exams
* Results
* Current User

---

# Validation

Examples include:

* Required fields
* Duplicate email prevention
* Duplicate ID prevention
* User authentication
* Role validation

---

# Future Improvements

Examples:

* Edit existing questions
* Edit existing answer options
* Timer for exams
* Search and filtering
* Exam statistics
* Responsive improvements

---

### Authors

* **Name:** Navot Saggi
* **Student ID:** 208745083


```
```
