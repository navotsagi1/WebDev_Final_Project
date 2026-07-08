import { AuthService } from "../services/AuthService.js";
import { ExamService } from "../services/ExamService.js";




//+====================== Constants ======================+
const teacherName = document.getElementById("teacher-name");
const logoutButton = document.getElementById("logout-button");
const createExamForm = document.getElementById("create-exam-form");
const message = document.getElementById("message");
const examList = document.getElementById("exam-list");




//+====================== Run ======================+
console.log("teacher dashboard controller loaded");

initialize();




//+====================== Initialize ======================+
function initialize() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser || currentUser.role !== "teacher") {
        window.location.href = "login.html";
        return;
    }

    teacherName.textContent = currentUser.fullName;

    renderExamList(currentUser.id);
    registerEventListeners(currentUser);
}


function registerEventListeners(currentUser) {
    logoutButton.addEventListener("click", handleLogout);

    createExamForm.addEventListener("submit", event => {
        handleCreateExam(event, currentUser);
    });
}





//+====================== Event Handlers ======================+
function handleLogout() {
    event.preventDefault();
    
    AuthService.logout();
    window.location.href = "../index.html";
}


function handleCreateExam(event, currentUser) {
    console.log("create exam submit clicked");
    event.preventDefault();

    const title = document.getElementById("exam-title").value;
    const description = document.getElementById("exam-description").value;
    const category = document.getElementById("exam-category").value;
    const code = document.getElementById("exam-code").value;
    const durationMinutes = document.getElementById("exam-duration").value;

    const result = ExamService.createExam(
        currentUser.id,
        title,
        description,
        category,
        code,
        durationMinutes
    );

    if (!result.success) {
        message.textContent = result.message;
        return;
    }

    message.textContent = "Exam created successfully!";
    createExamForm.reset();

    renderExamList(currentUser.id);
}




//+====================== Renderers ======================+
function renderExamList(teacherId) {
    examList.innerHTML = "";

    const exams = ExamService.getExamsByTeacher(teacherId);

    if (exams.length === 0) {
        examList.textContent = "No exams created yet.";
        return;
    }

    exams.forEach(exam => {
        const examCard = document.createElement("div");
        examCard.classList.add("exam-card");

        const title = document.createElement("h3");
        title.textContent = exam.title;

        const category = document.createElement("p");
        category.textContent = `Category: ${exam.category}`;

        const duration = document.createElement("p");
        duration.textContent = `Duration: ${exam.durationMinutes} minutes`;

        const manageButton = document.createElement("button");
        manageButton.textContent = "Manage";
        manageButton.addEventListener("click", () => {
            window.location.href = `exam-details.html?id=${exam.id}`;
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            ExamService.deleteExam(exam.id);
            renderExamList(teacherId);
        });

        examCard.appendChild(title);
        examCard.appendChild(category);
        examCard.appendChild(duration);
        examCard.appendChild(manageButton);
        examCard.appendChild(deleteButton);

        examList.appendChild(examCard);
    });
}