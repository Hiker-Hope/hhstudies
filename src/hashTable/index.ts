const PRIME_BASE_NUMBER = 307;

export const keyToString = (key: any): string => {
    if (typeof key === 'string') {
        return key;
    }
    return key.toString();
}

export const hash = (key: any): number | null => {
    if (typeof key === 'object' || typeof key === 'function') {
        console.log('Provided key is not hashable');
        return null;
    }

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
        let index = hashedKey !== null ?  hashedKey % this.tableSize : hashedKey;

        if (index !== null) {
            // if we have this slot occupied
            while (this.storage[index] !== undefined) {
                // if the key is identical - we stop searching for an empty slot and update the value
                if (this.storage[index][0] === key) {
                    break;
                }
                index += 1 % this.tableSize;
            }
            this.storage[index] = [key, value];
        }
    }

    removeValue = function(key: KeyT): void {
        const hashedKey = hash(key);
        let index = hashedKey !== null ?  hashedKey % this.tableSize : hashedKey;
        if (hashedKey!== null && !!this.storage[index] && this.storage[index][0] === key) {
            delete this.storage[index]
        } else {
            console.error(`Element with key "${key}" not found`)
        }
    }

    findValue = function(key: KeyT): ValueT | undefined {
        const hashedKey = hash(key);
        if (hashedKey === null) {
            console.log('Provided key is not hashable');
            return undefined;
        }

        let index = hashedKey % this.tableSize;
        // if we have this slot occupied
        if (!!this.storage[index] ) {
            // if the slot is occupied with another key - it's a collision
            while (this.storage[index][0] !== key) {
                index += 1 % this.tableSize;
                break;
            }
            return this.storage[index][1];
        } else {
            console.log(`Element with key "${key}" is undefined`);
            return undefined;
        }
    }
}
