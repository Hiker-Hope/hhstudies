// TODO всё ещё есть возможность получения одинаковых индексов для разных ключей
//  придумать, как разобраться с коллизиями

export const hash = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i) * i;
    }
    return hash;
}

export class HashTable {
    public storage: Array<string>[];

    constructor() {
        this.storage = []
    }

    addValue = function(key: string, value: any) {
        const index = hash(key);
        this.storage[index] = [key, value];
    }

    removeValue = function(key: string) {
        const index = hash(key)
        if (!!this.storage[index] && this.storage[index][0] === key) {
            delete this.storage[index]
        } else {
            console.error(`Element with key "${key}" not found`)
        }
    }

    findValue = function(key) {
        let index = hash(key)
        if (!!this.storage[index] && this.storage[index][0] === key) {
            return this.storage[index][1]
        } else {
            console.log(`Element with key "${key}" not found`)
            return undefined
        }
    }
}

const myHash = new HashTable();

myHash.addValue('hello', 'mister')
console.log(1, myHash)
myHash.addValue('hi', 'miss')
console.log(2, myHash)
myHash.removeValue('hello')
console.log(3, myHash)
myHash.findValue('hi')
myHash.findValue('hello')
