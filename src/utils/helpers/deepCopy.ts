export function deepCopy(obj:any) {
    if (Array.isArray(obj)) {
        // If it's an array, create a new array and recursively deep copy its elements.
        return obj.map(deepCopy);
    } else if (typeof obj === 'object' && obj !== null) {
        // If it's an object, create a new object and recursively deep copy its properties.
        const newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = deepCopy(obj[key]);
            }
        }
        return newObj;
    } else {
        // If it's a primitive value, return it as is.
        return obj;
    }
}