import { AuthService } from "../services/AuthService.js";
import { ExamService } from "../services/ExamService.js";




//+====================== Constants ======================+
const backButton = document.getElementById("back-button");
const logoutButton = document.getElementById("logout-button");
const message = document.getElementById("message");

const examInfoForm = document.getElementById("exam-info-form");
const examTitleInput = document.getElementById("exam-title");
const examDescriptionInput = document.getElementById("exam-description");

const addQuestionForm = document.getElementById("add-question-form");
const questionTextInput = document.getElementById("question-text");

const questionList = document.getElementById("question-list");

const params = new URLSearchParams(window.location.search);
const examId = params.get("id");





//+====================== Run ======================+
initialize();





//+====================== Initialize ======================+
function initialize() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser || currentUser.role !== "teacher") {
        window.location.href = "login.html";
        return;
    }

    if (!examId) {
        window.location.href = "teacher-dashboard.html";
        return;
    }

    loadExam();
    registerEventListeners();
}

function registerEventListeners() {
    backButton.addEventListener("click", () => {
        window.location.href = "teacher-dashboard.html";
    });

    logoutButton.addEventListener("click", () => {
        AuthService.logout();
        window.location.href = "login.html";
    });

    examInfoForm.addEventListener("submit", handleUpdateExam);
    addQuestionForm.addEventListener("submit", handleAddQuestion);
}

function loadExam() {
    const result = ExamService.getExam(examId);

    if (!result.success) {
        message.textContent = result.message;
        return;
    }

    const exam = result.data;

    examTitleInput.value = exam.title;
    examDescriptionInput.value = exam.description || "";

    renderQuestions(exam.questions);
}




//+====================== Handlers ======================+
function handleUpdateExam(event) {
    event.preventDefault();

    const title = examTitleInput.value.trim();
    const description = examDescriptionInput.value.trim();

    const result = ExamService.updateExam(examId, title, description);

    message.textContent = result.message;

    if (result.success) {
        loadExam();
    }
}

function handleAddQuestion(event) {
    event.preventDefault();

    const questionText = questionTextInput.value.trim();

    const result = ExamService.addQuestion(examId, questionText);

    message.textContent = result.message;

    if (result.success) {
        questionTextInput.value = "";
        loadExam();
    }
}




//+====================== Renderers ======================+
function renderQuestions(questions) {
    questionList.innerHTML = "";

    if (!questions || questions.length === 0) {
        questionList.textContent = "No questions yet.";
        return;
    }

    questions.forEach(question => {
        const questionCard = document.createElement("div");
        questionCard.style.border = "1px solid black";
        questionCard.style.padding = "10px";
        questionCard.style.marginBottom = "10px";

        const questionTitle = document.createElement("h3");
        questionTitle.textContent = question.text;

        const deleteQuestionButton = document.createElement("button");
        deleteQuestionButton.textContent = "Delete Question";
        deleteQuestionButton.addEventListener("click", () => {
            handleRemoveQuestion(question.id);
        });

        const optionsContainer = document.createElement("div");
        renderAnswerOptions(optionsContainer, question);

        const addOptionForm = document.createElement("form");

        const optionInput = document.createElement("input");
        optionInput.type = "text";
        optionInput.placeholder = "Answer option";
        optionInput.required = true;

        const correctLabel = document.createElement("label");

        const correctCheckbox = document.createElement("input");
        correctCheckbox.type = "checkbox";

        correctLabel.appendChild(correctCheckbox);
        correctLabel.append(" Correct answer");

        const addOptionButton = document.createElement("button");
        addOptionButton.type = "submit";
        addOptionButton.textContent = "Add Option";

        addOptionForm.appendChild(optionInput);
        addOptionForm.appendChild(correctLabel);
        addOptionForm.appendChild(addOptionButton);

        addOptionForm.addEventListener("submit", event => {
            event.preventDefault();

            handleAddAnswerOption(
                question.id,
                optionInput.value.trim(),
                correctCheckbox.checked
            );
        });

        questionCard.appendChild(questionTitle);
        questionCard.appendChild(deleteQuestionButton);
        questionCard.appendChild(optionsContainer);
        questionCard.appendChild(addOptionForm);

        questionList.appendChild(questionCard);
    });
}


function renderAnswerOptions(container, question) {
    container.innerHTML = "";

    if (!question.answerOptions || question.answerOptions.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No answer options yet.";
        container.appendChild(emptyMessage);
        return;
    }

    const list = document.createElement("ul");

    question.answerOptions.forEach(option => {
        const item = document.createElement("li");

        item.textContent = option.isCorrect
            ? `${option.text} ✔`
            : option.text;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            handleRemoveAnswerOption(question.id, option.id);
        });

        item.appendChild(deleteButton);
        list.appendChild(item);
    });

    container.appendChild(list);
}

function handleRemoveQuestion(questionId) {
    const result = ExamService.removeQuestion(examId, questionId);

    message.textContent = result.message;

    if (result.success) {
        loadExam();
    }
}

function handleAddAnswerOption(questionId, optionText, isCorrect) {
    const result = ExamService.addAnswerOption(
        examId,
        questionId,
        optionText,
        isCorrect
    );

    message.textContent = result.message;

    if (result.success) {
        loadExam();
    }
}

function handleRemoveAnswerOption(questionId, optionId) {
    const result = ExamService.removeAnswerOption(
        examId,
        questionId,
        optionId
    );

    message.textContent = result.message;

    if (result.success) {
        loadExam();
    }
}