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

const isDeepEqualKeys = ({storedKey, targetKey}): boolean => {
    const isPrimitiveKey = typeof targetKey !== 'object' && typeof targetKey !== 'function';

    if (isPrimitiveKey) {
        return storedKey === targetKey;
    } else {
        if (typeof storedKey === 'bigint') {
            return false;
        } else {
            return JSON.stringify(storedKey) === JSON.stringify(targetKey);
        }
    }
}

export class HashTable<KeyT, ValueT> {
    public storage: Array<KeyT | ValueT>[];
    private tableSize: number;
    private filledSlotsAmount: number;

    constructor(elementsAmount: number) {
        this.storage = [];
        this.tableSize = elementsAmount * 2;
        this.filledSlotsAmount = 0;
    }

    addValue = function(key: KeyT, value: ValueT): void {
        const hashedKey = hash(key);
        let index = hashedKey % this.tableSize;
        let squareRoot = 1;

        // if we have this slot occupied
        while (this.storage[index] !== undefined) {
            // if the key is identical - we stop searching for an empty slot and update the value
            if (isDeepEqualKeys({storedKey: this.storage[index][0], targetKey: key})) {
                break;
            }
            index += Math.pow(squareRoot, 2);
            index = index % this.tableSize;
            squareRoot++;
        }
        this.storage[index] = [key, value];
        this.filledSlotsAmount++;

        if ((this.filledSlotsAmount /(this.tableSize / 100)) >= 60) {
            this.resize();
        }
    }

    removeValue = function(key: KeyT): void {
        const hashedKey = hash(key);
        let index =  hashedKey % this.tableSize;
        let squareRoot = 1;

        // if we have this slot occupied
        if (!!this.storage[index] ) {

            // if the slot is occupied with another key - it's a collision
            while (!isDeepEqualKeys({storedKey: this.storage[index][0], targetKey: key})) {
                index += Math.pow(squareRoot, 2);
                index = index % this.tableSize;
                squareRoot++;
            }

            delete this.storage[index]
            this.filledSlotsAmount--;
        } else {
            console.log(`Element with key "${key}" not found`)
        }
    }

    findValue = function(key: KeyT): ValueT | undefined {
        const hashedKey = hash(key);

        let index = hashedKey % this.tableSize;
        let squareRoot = 1;
        // if we have this slot occupied
        if (!!this.storage[index] ) {

            // if the slot is occupied with another key - it's a collision
            while (!isDeepEqualKeys({storedKey: this.storage[index][0], targetKey: key})) {
                index += Math.pow(squareRoot, 2);
                index = index % this.tableSize;
                squareRoot++;
            }

            return this.storage[index][1];
        } else {
            console.log(`Element with key "${key}" is undefined`);
            return undefined;
        }
    }

    resize = function(): void {
        const newTableSize = this.tableSize * 2;
        const newStorage: Array<KeyT | ValueT>[] = [];

        for (let i = 0; i < this.tableSize; i++) {
            if (this.storage[i] !== undefined) {
                const hashedKey = hash(this.storage[i][0]);
                let index = hashedKey % newTableSize;
                let squareRoot = 1;

                // if we have this slot occupied
                while (newStorage[index] !== undefined) {
                    // if the key is identical - we stop searching for an empty slot and update the value
                    if (isDeepEqualKeys({storedKey: newStorage[index][0], targetKey: this.storage[i][0]})) {
                        break;
                    }
                    index += Math.pow(squareRoot, 2);
                    index = index % newTableSize;
                    squareRoot++;
                }
                newStorage[index] = [this.storage[i][0], this.storage[i][1]];
            }
        }

        this.tableSize = newTableSize;
        this.storage = newStorage;
    }
}
