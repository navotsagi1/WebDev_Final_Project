import { StorageService } from "./StorageService.js";
import { STORAGE_KEYS } from "../utils/StorageKeys.js";
import { Teacher } from "../models/Teacher.js";
import { Student } from "../models/Student.js";

//+====================== Authentication Service ======================+
export class AuthService{
    static register(fullName, id, email, password, role) {
        if (!fullName || !id || !email || !password || !role) {
            return {
                success: false,
                message: "All fields are required."
            };
        }

        if (role !== "teacher" && role !== "student") {
            return {
                success: false,
                message: "Invalid user role."
            };
        }

        const users = StorageService.get(STORAGE_KEYS.USERS);

        const idExists = users.some(user => user.id === id);

        if (idExists) {
            return {
                success: false,
                message: "A user with this ID already exists."
            };
        }

        const emailExists = users.some(user => user.email === email);

        if (emailExists) {
            return {
                success: false,
                message: "A user with this email already exists."
            };
        }

        let user;

        if (role === "teacher") {
            user = new Teacher(fullName, id, email, password);
        } else {
            user = new Student(fullName, id, email, password);
        }

        StorageService.add(STORAGE_KEYS.USERS, user);

        return {
            success: true,
            data: user,
            message: "Registration successful."
        };
    }



    
   static login(id, password) {
        const user = StorageService.find(STORAGE_KEYS.USERS, id);

        if (!user) {
            return {
                success: false,
                data: null,
                message: `User "${id}" does not exist.`
            };
        }

        if (user.password !== password) {
            return {
                success: false,
                data: null,
                message: "Password does not match."
            };
        }

        StorageService.save(STORAGE_KEYS.CURRENT_USER, id);

        return {
            success: true,
            data: user,
            message: "Login successful."
        };
    }




    static logout(){
        STORAGE_KEYS.CURRENT_USER = null;
    }




    static getCurrentUser(){
        const currentUserId = StorageService.get(STORAGE_KEYS.CURRENT_USER);

        if (!currentUserId) return null;
        
        return StorageService.find(STORAGE_KEYS.USERS, currentUserId);
    }



    static getUserById(userId) {
        const user = StorageService.find(STORAGE_KEYS.USERS, userId);

        if (!user) {
            return {
                success: false,
                message: "User not found."
            };
        }

        return {
            success: true,
            data: user
        };
    }

}