import { STORAGE_KEYS } from "../utils/StorageKeys.js";

//+====================== Storage Service ======================+
export class StorageService{
    static initialize(){

        const defaultStorage = {
            [STORAGE_KEYS.USERS]: [],
            [STORAGE_KEYS.EXAMS]: [],
            [STORAGE_KEYS.RESULTS]: [],
            [STORAGE_KEYS.CURRENT_USER]: null
        };

        for (const [key, defaultValue] of Object.entries(defaultStorage)) {
            if (localStorage.getItem(key) === null) 
                localStorage.setItem(key, JSON.stringify(defaultValue));
        }
    }

    static get(key){
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }


    static save(key, data){
        localStorage.setItem(key, JSON.stringify(data));
    }


    static add(key, item){
        const data = StorageService.get(key);
        data.push(item);
        StorageService.save(key, data);
    }


    static update(key, id, updatedItem) {
        const data = StorageService.get(key);

        const updatedData = data.map(item =>
            item.id === id ? updatedItem : item
        );

        StorageService.save(key, updatedData);
    }


    static remove(key, id) {
        const data = StorageService.get(key);
        const filteredData = data.filter(item => item.id !== id);

        StorageService.save(key, filteredData);
    }

    static find(key, id){
        const data = StorageService.get(key);
        return data.find(item => item.id === id);
    }
}