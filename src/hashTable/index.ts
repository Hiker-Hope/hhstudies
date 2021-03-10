const PRIME_BASE_NUMBER = 37;

export const keyToString = (key: any): string => {
    if (typeof key === 'string') {
        return key;
    }
    if (typeof key === 'boolean') {
        return key.toString() + '_bool';
    }
}

export const hash = (key: any): number | null => {
    if (typeof key === 'object' || typeof key === 'function') {
        console.log('Provided key is not hashable');
        return null;
    }
    if (typeof key === 'number') {
        return key;
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

    constructor() {
        this.storage = []
    }

    addValue = function(key: KeyT, value: ValueT): void {
        const index = hash(key);
        if (index !== null) {
            this.storage[index] = [key, value];
        }
    }

    removeValue = function(key: KeyT): void {
        const index = hash(key)
        if (!!this.storage[index] && this.storage[index][0] === key) {
            delete this.storage[index]
        } else {
            console.error(`Element with key "${key}" not found`)
        }
    }

    findValue = function(key: KeyT): ValueT | undefined {
        let index = hash(key)
        if (!!this.storage[index] && this.storage[index][0] === key) {
            return this.storage[index][1]
        } else {
            console.log(`Element with key "${key}" is undefined`)
            return undefined
        }
    }
}
