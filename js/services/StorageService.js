//+====================== Storage Service ======================+
// This class acts as an API for the localStorage.
// Note: Key is a data collection name within local storage.

export class StorageService{
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


    static update(key, item){
        const data = StorageService.get(key);
        
        const updatedData = data.map(item =>
                item.id === updatedItem.id ? updatedItem : item);

        StorageService.save(key, updatedData);
    }


    static remove(key, id) {
        const data = StorageService.get(key);
        const filteredData = data.filter(item => item.id !== id);

        StorageService.save(key, filteredData);
    }

    static find(key, id){
        const data = StorageService.get(key);
        return data.filter(item => item.id !== id);
    }
}