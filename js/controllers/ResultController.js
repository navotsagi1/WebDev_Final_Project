import { AuthService } from "../services/AuthService.js";
import { ResultService } from "../services/ResultService.js";




//+====================== Constants ======================+
const backButton = document.getElementById("back-button");
const logoutButton = document.getElementById("logout-button");
const message = document.getElementById("message");
const resultsTitle = document.getElementById("results-title");
const resultsList = document.getElementById("results-list");




//+====================== Run ======================+
let currentUser = null;

initialize();




//+====================== Initialize ======================+
function initialize() {
    currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    registerEventListeners();
    loadResults();
}


function registerEventListeners() {
    backButton.addEventListener("click", handleBack);
    logoutButton.addEventListener("click", handleLogout);
}


function loadResults() {
    let result;

    if (currentUser.role === "student") {
        resultsTitle.textContent = "My Results";
        result = ResultService.getResultsByStudent(currentUser.id);
    } else if (currentUser.role === "teacher") {
        resultsTitle.textContent = "Student Results";
        result = ResultService.getResultsForTeacher(currentUser.id);
    } else {
        message.textContent = "Unknown user role.";
        return;
    }

    if (!result.success) {
        message.textContent = result.message;
        return;
    }

    renderResults(result.data);
}




//+====================== Handlers ======================+
function handleBack() {
    if (currentUser.role === "teacher") {
        window.location.href = "teacher-dashboard.html";
    } else {
        window.location.href = "student-dashboard.html";
    }
}


function handleLogout() {
    AuthService.logout();
    window.location.href = "login.html";
}




//+====================== Renderers ======================+
function renderResults(results) {
    resultsList.innerHTML = "";

    if (!results || results.length === 0) {
        resultsList.textContent = "No results found.";
        return;
    }

    results.forEach(result => {
        const resultCard = document.createElement("div");

        resultCard.style.border = "1px solid black";
        resultCard.style.padding = "10px";
        resultCard.style.marginBottom = "10px";

        const examTitle = document.createElement("h3");
        examTitle.textContent = result.examTitle;

        if (currentUser.role === "teacher") {
            const userResult = AuthService.getUserById(result.studentId);

            if (userResult.success) {
                const student = userResult.data;

                const studentInfo = document.createElement("p");
                studentInfo.textContent =
                    `Student: ${student.fullName} (${student.id})`;

                resultCard.appendChild(studentInfo);
            }
        }

        const score = document.createElement("p");
        score.textContent = `Score: ${result.score}`;

        const correctAnswers = document.createElement("p");
        correctAnswers.textContent =
            `Correct answers: ${result.correctAnswers}/${result.totalQuestions}`;

        const submittedAt = document.createElement("p");
        submittedAt.textContent =
            `Submitted at: ${new Date(result.submittedAt).toLocaleString()}`;

        resultCard.appendChild(examTitle);
        resultCard.appendChild(score);
        resultCard.appendChild(correctAnswers);
        resultCard.appendChild(submittedAt);

        resultsList.appendChild(resultCard);
    });
}