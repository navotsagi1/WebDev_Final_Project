import { StorageService } from "./StorageService.js";
import { STORAGE_KEYS } from "../utils/StorageKeys.js";
import { Teacher } from "../models/Teacher.js";
import { Student } from "../models/Student.js";

//+====================== Authentication Service ======================+
export class AuthService{
    static register(fullName, id, email, password, role){
        const check = StorageService.find(STORAGE_KEYS.USERS, id);

        if(check == []){
            return{
                success: false,
                message: `User "${id}" already exists.`
            }
        }
            
        if (role == "teacher"){
            const teacher = new Teacher(fullName, id, email, password);
            StorageService.add(STORAGE_KEYS.USERS, teacher);
        }
        if(role == "student"){
            const student = new Student(fullName, id, email, password);
            StorageService.add(STORAGE_KEYS.USERS, student);
        }
        
        return {
                success: true,
                message: `User "${id}" was created successfully.`
            }
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

}