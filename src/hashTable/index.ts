// TODO всё ещё есть возможность получения одинаковых индексов для разных ключей
//  придумать, как разобраться с коллизиями

export const hash = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i) * i;
    }
    return hash;
}

export class HashTable<ValueT> {
    public storage: Array<string | ValueT>[];

    constructor() {
        this.storage = []
    }

    addValue = function(key: string, value: ValueT) {
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
            console.log(`Element with key "${key}" is undefined`)
            return undefined
        }
    }
}
