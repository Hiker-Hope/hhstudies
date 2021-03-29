const PRIME_BASE_NUMBER = 307;

export const handleObjectToString = (object: object | Array<any>): string => {
    if (Array.isArray(object)) {
        return object.toString();
    }

    const firstKey = Object.keys(object)[0];

    return firstKey.toString() + '_' + object[firstKey].toString();
}

export const keyToString = (key: any): string => {
    if (typeof key === 'string') {
        return key;
    }
    if (typeof key === 'object') {
        return handleObjectToString(key);
    }
    return key.toString();
}

export const hash = (key: any): number | null => {
    let hash = 0;
    let keyString = keyToString(key);
    for (let i = 0; i < keyString.length; i++) {
        hash = hash * PRIME_BASE_NUMBER + keyString.charCodeAt(i);
    }
    return hash;
}

export class HashTable<KeyT, ValueT> {
    public storage: Array<KeyT | ValueT>[];
    private tableSize: number;

    constructor(elementsAmount: number) {
        this.storage = [];
        this.tableSize = elementsAmount * 2;
    }

    addValue = function(key: KeyT, value: ValueT): void {
        const hashedKey = hash(key);
        let index = hashedKey % this.tableSize;
        const isNotPrimitiveKey = typeof key === 'object' || typeof key === 'function';

        // if we have this slot occupied
        while (this.storage[index] !== undefined) {
            // if the key is identical - we stop searching for an empty slot and update the value
            if (
                (!isNotPrimitiveKey && this.storage[index][0] === key)
                || (isNotPrimitiveKey && typeof this.storage[index][0] === 'bigint')
                || (isNotPrimitiveKey && JSON.stringify(this.storage[index][0]) === JSON.stringify(key))
            ) {
                break;
            }
            index += 1 % this.tableSize;
        }
        this.storage[index] = [key, value];
    }

    removeValue = function(key: KeyT): void {
        const hashedKey = hash(key);
        let index =  hashedKey % this.tableSize;
        const isNotPrimitiveKey = typeof key === 'object' || typeof key === 'function';

        if (hashedKey!== null
            && !!this.storage[index]
            && ((!isNotPrimitiveKey && this.storage[index][0] === key)
                || (isNotPrimitiveKey && typeof this.storage[index][0] === 'bigint')
                || (isNotPrimitiveKey && JSON.stringify(this.storage[index][0]) === JSON.stringify(key)))
        ) {
            delete this.storage[index]
        } else {
            console.log(`Element with key "${key}" not found`)
        }
    }

    findValue = function(key: KeyT): ValueT | undefined {
        const hashedKey = hash(key);
        const isNotPrimitiveKey = typeof key === 'object' || typeof key === 'function';

        let index = hashedKey % this.tableSize;
        // if we have this slot occupied
        if (!!this.storage[index] ) {

            // if the slot is occupied with another key - it's a collision
            while ((!isNotPrimitiveKey && this.storage[index][0] !== key)
                || (isNotPrimitiveKey && typeof this.storage[index][0] === 'bigint')
                || (isNotPrimitiveKey && JSON.stringify(this.storage[index][0]) !== JSON.stringify(key))
                ) {
                index += 1 % this.tableSize;
            }

            return this.storage[index][1];
        } else {
            console.log(`Element with key "${key}" is undefined`);
            return undefined;
        }
    }
}
