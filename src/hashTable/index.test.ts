import {keyToString, hash, HashTable} from './index'
import {keyStrings, keys, keysAsStrings, keyNumbers} from '../testData/hash'


test('HASH FUNCTION: returns unique indices for anagrams', () => {
    for (let i = 0; i < keyStrings.length -1; i++) {
        for (let j = i + 1; j < keyStrings.length; j++) {
            expect(hash(keyStrings[i])).not.toBe(hash(keyStrings[j]));
        }
    }
});

test('HASH FUNCTION: returns keys as indices for numbers', () => {
    for (let i = 0; i < keyNumbers.length -1; i++) {
            expect(hash(keyNumbers[i])).toBe(keyNumbers[i]);
    }
});

test('KEY TO STRING FUNCTION: returns strings for various types of keys', () => {
    for (let i = 0; i < keys.length -1; i++) {
        expect(keyToString(keys[i])).toBe(keysAsStrings[i]);
    }
});

test('HASH TABLE: adds and finds values', () => {
    const hashTable = new HashTable();

    hashTable.addValue('juice', 150);
    hashTable.addValue('milk', 30);
    hashTable.addValue('oranges', 200);
    hashTable.addValue('butter', 100);

    const keys = ['juice', 'milk', 'oranges', 'butter'];
    const values = [150, 30, 200, 100];

    keys.forEach((key, index) => {
        expect(hashTable.findValue(key)).not.toBeUndefined();
        expect(hashTable.findValue(key)).toBe(values[index]);
    })
});

test('HASH TABLE: removes values', () => {
    const hashTable = new HashTable();

    hashTable.addValue('juice', 150);
    hashTable.addValue('milk', 30);
    hashTable.removeValue('juice');

    expect(hashTable.findValue('milk')).not.toBeUndefined();
    expect(hashTable.findValue('juice')).toBeUndefined();
});