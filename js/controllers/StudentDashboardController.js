import { AuthService } from "../services/AuthService.js";
import { ExamService } from "../services/ExamService.js";




//+====================== Constants ======================+
const studentName = document.getElementById("student-name");
const logoutButton = document.getElementById("logout-button");
const message = document.getElementById("message");
const examList = document.getElementById("exam-list");


//+====================== Run ======================+
initialize();




//+====================== Initialize ======================+
function initialize() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser || currentUser.role !== "student") {
        window.location.href = "login.html";
        return;
    }

    studentName.textContent = currentUser.fullName;

    renderExamList();
    registerEventListeners();
}

function registerEventListeners() {
    logoutButton.addEventListener("click", handleLogout);
}




//+====================== Handlers ======================+
function handleLogout() {
    AuthService.logout();
    window.location.href = "login.html";
}





//+====================== Renderers ======================+
function renderExamList() {
    examList.innerHTML = "";

    const result = ExamService.getAllExams();

    if (!result.success) {
        message.textContent = result.message;
        return;
    }

    const exams = result.data;

    if (exams.length === 0) {
        examList.textContent = "No exams available.";
        return;
    }

    exams.forEach(exam => {
        const examCard = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = exam.title;

        const description = document.createElement("p");
        description.textContent = exam.description || "No description.";

        const startButton = document.createElement("button");
        startButton.textContent = "Start Exam";

        startButton.addEventListener("click", () => {
            window.location.href = `take-exam.html?id=${exam.id}`;
        });

        examCard.appendChild(title);
        examCard.appendChild(description);
        examCard.appendChild(startButton);

        examList.appendChild(examCard);
    });
}