//+====================== Authentication Service ======================+
import { StorageService } from "./StorageService.js";
import { STORAGE_KEYS } from "../StorageKeys.js";
import { Teacher } from "../models/Teacher.js";
import { Student } from "../models/Student.js";

export class AuthService{
    static register(fullname, id, email, password, role){
            if( StorageService.find(STORAGE_KEYS.USERS, id))
                return{
                    success: false,
                    message: `User "${id}" does not exist.`
                }
            
            if (role == "Teacher"){
                const teacher = new Teacher(fullname, id, email, password);
                StorageService.add(STORAGE_KEYS.USERS, teacher);
            }
            else{
                const student = new Student(fullname, id, email, password);
                StorageService.add(STORAGE_KEYS.USERS, student);
            }

            return{
                    success: true,
                    message: `User "${id}" was created successfully.`
                }
    }

    static login(id, password){
        const user = StorageService.find(USERS, id);
        if (!user){
            return {
                success: false,
                message: `User "${id}" does not exist.`
            }
        }

        if(user.password !== password){
            return {
                success: false,
                message: "Password does not match."
            }
        }

        STORAGE_KEYS.CURRENT_USER = id;
        return{
            success: true,
            message: "Login successful."
        }
    }

    static logout(){
        STORAGE_KEYS.CURRENT_USER = null;
    }

    static getCurrentUser(){
        return STORAGE_KEYS.CURRENT_USER;
    }
}