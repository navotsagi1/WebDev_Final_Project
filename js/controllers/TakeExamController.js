import { AuthService } from "../services/AuthService.js";
import { ExamService } from "../services/ExamService.js";
import { ResultService } from "../services/ResultService.js";




//+====================== Constants ======================+
const examTitle = document.getElementById("exam-title");
const examDescription = document.getElementById("exam-description");
const message = document.getElementById("message");
const examForm = document.getElementById("exam-form");
const questionList = document.getElementById("question-list");

const params = new URLSearchParams(window.location.search);
const examId = params.get("id");




//+====================== Run ======================+
let currentUser = null;
let currentExam = null;

initialize();




//+====================== Initialize ======================+
function initialize() {
    currentUser = AuthService.getCurrentUser();

    if (!currentUser || currentUser.role !== "student") {
        window.location.href = "login.html";
        return;
    }

    if (!examId) {
        window.location.href = "student-dashboard.html";
        return;
    }

    loadExam();
    registerEventListeners();
}


function registerEventListeners() {
    examForm.addEventListener("submit", handleSubmitExam);
}

function loadExam() {
    const result = ExamService.getExam(examId);

    if (!result.success) {
        message.textContent = result.message;
        return;
    }

    currentExam = result.data;

    examTitle.textContent = currentExam.title;
    examDescription.textContent = currentExam.description || "";

    renderQuestions();
}




//+====================== Handlers ======================+
function handleSubmitExam(event) {
    event.preventDefault();

    markSelectedAnswers();

    const result = ResultService.submitResult(currentUser.id, currentExam);

    if (!result.success) {
        message.textContent = result.message;
        return;
    }

    alert(`Exam submitted. Score: ${result.data.score}`);

    window.location.href = "student-dashboard.html";
}




//+====================== Renderers ======================+
function renderQuestions() {
    questionList.innerHTML = "";

    if (!currentExam.questions || currentExam.questions.length === 0) {
        questionList.textContent = "This exam has no questions.";
        return;
    }

    currentExam.questions.forEach((question, questionIndex) => {
        const questionCard = document.createElement("div");

        const questionTitle = document.createElement("h3");
        questionTitle.textContent = `${questionIndex + 1}. ${question.text}`;

        questionCard.appendChild(questionTitle);

        question.answerOptions.forEach(option => {
            const label = document.createElement("label");

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = question.id;
            radio.value = option.id;
            radio.required = true;

            label.appendChild(radio);
            label.append(` ${option.text}`);

            questionCard.appendChild(label);
            questionCard.appendChild(document.createElement("br"));
        });

        questionList.appendChild(questionCard);
    });
}





//+====================== Helpers ======================+
function markSelectedAnswers() {
    currentExam.questions.forEach(question => {
        const selectedOptionId = document.querySelector(
            `input[name="${question.id}"]:checked`
        ).value;

        question.answerOptions.forEach(option => {
            option.selected = option.id === selectedOptionId;
        });
    });
}
