// Function to write data to localStorage
export function writeToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        console.log(`Data successfully written to localStorage with key: ${key}`);
    } catch (error) {
        console.error(`Error writing data to localStorage: ${error}`);
    }
}

// Function to read data from localStorage
export function readFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        if (data !== null) {
            console.log(`Data successfully read from localStorage with key: ${key}`);
            return JSON.parse(data);
        } else {
            console.log(`No data found in localStorage with key: ${key}`);
            return null;
        }
    } catch (error) {
        console.error(`Error reading data from localStorage: ${error}`);
        return null;
    }
}

export function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}