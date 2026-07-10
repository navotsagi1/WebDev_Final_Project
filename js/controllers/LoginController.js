import { AuthService } from "../services/AuthService.js";

const form = document.getElementById("login-form");
const message = document.getElementById("message");

form.addEventListener("submit", event => {
    event.preventDefault();

    const id = document.getElementById("id-number").value;
    const password = document.getElementById("password").value;

    const result = AuthService.login(id, password);

    if (!result.success) {
        message.textContent = result.message;
        return;
    }

    message.textContent = "Login successful!";

    if (result.data.role === "teacher") {
        window.location.href = "teacher-dashboard.html";
    } else {
        window.location.href = "student-dashboard.html";
    }
});