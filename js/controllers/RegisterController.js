import { User } from "../models/User.js";
import { AuthService } from "../services/AuthService.js";
import { StorageService } from "../services/StorageService.js";
import { STORAGE_KEYS } from "../utils/StorageKeys.js";

const form = document.getElementById("register-form");
const message = document.getElementById("message");



form.addEventListener("submit", event => {

    event.preventDefault();

    const fullName = document.getElementById("full-name").value;
    const id = document.getElementById("id-number").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
   
    const result = AuthService.register(fullName, id, email, password, role);

    if (!result.success) {
        message.textContent = result.message;
        return;
    }

    message.textContent = "Registration successful!";

});