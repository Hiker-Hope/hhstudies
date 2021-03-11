import {keyToString, hash, HashTable} from './index'
import {keyStrings, keys, keysAsStrings} from '../testData/hash'


test('HASH FUNCTION: returns unique indices for anagrams', () => {
    for (let i = 0; i < keyStrings.length -1; i++) {
        for (let j = i + 1; j < keyStrings.length; j++) {
            expect(hash(keyStrings[i])).not.toBe(hash(keyStrings[j]));
        }
    }
});

test('HASH FUNCTION: returns null for objects, arrays and functions', () => {
    expect(hash([2,4,6,'p'])).toBe(null);
    expect(hash({j: 1, k: 'k'})).toBe(null);
    expect(hash(() => {})).toBe(null);
});

test('KEY TO STRING FUNCTION: returns strings for various types of keys', () => {
    for (let i = 0; i < keys.length -1; i++) {
        expect(keyToString(keys[i])).toBe(keysAsStrings[i]);
    }
});

test('HASH TABLE: adds and finds values', () => {
    const hashTable = new HashTable(7);

    hashTable.addValue('juice', 150);
    hashTable.addValue('milk', 30);
    hashTable.addValue('oranges', 200);
    hashTable.addValue('butter', 100);
    hashTable.addValue(false, 300);
    hashTable.addValue(405, 350);
    hashTable.addValue(9007199254740991n, 'hey there');

    const keys = ['juice', 'milk', 'oranges', 'butter', false, 405, 9007199254740991n];
    const values = [150, 30, 200, 100, 300, 350, 'hey there'];

    keys.forEach((key, index) => {
        expect(hashTable.findValue(key)).not.toBeUndefined();
        expect(hashTable.findValue(key)).toBe(values[index]);
    })
});

test('HASH TABLE: updates values with identical keys', () => {
    const hashTable = new HashTable(3);

    hashTable.addValue('butter', 'cheap');
    hashTable.addValue(405, 111);
    hashTable.addValue(9007199254740991n, 'hey there');

    hashTable.addValue('butter', 'expensive');
    hashTable.addValue(405, 222);
    hashTable.addValue(9007199254740991n, 'bye there');

    const keys = ['butter', 405, 9007199254740991n];
    const values = ['expensive', 222, 'bye there'];

    keys.forEach((key, index) => {
        expect(hashTable.findValue(key)).not.toBeUndefined();
        expect(hashTable.findValue(key)).toBe(values[index]);
    })
});

test('HASH TABLE: removes values', () => {
    const hashTable = new HashTable(10);

    hashTable.addValue('juice', 150);
    hashTable.addValue('milk', 30);
    hashTable.addValue(false, 30);
    hashTable.addValue(405, 30);
    hashTable.removeValue('juice');
    hashTable.removeValue(false);
    hashTable.removeValue(405);


    expect(hashTable.findValue('milk')).not.toBeUndefined();
    expect(hashTable.findValue('juice')).toBeUndefined();
    expect(hashTable.findValue(405)).toBeUndefined();
    expect(hashTable.findValue(false)).toBeUndefined();
});

test('HASH TABLE: does not add values with unhashable keys', () => {
    const hashTable = new HashTable(10);

    const obj = {hey: 'juice'};
    const func = () => {};
    const arr = [false, 2,4]

    hashTable.addValue(obj, 150);
    hashTable.addValue(arr, 30);
    hashTable.addValue(func, 30);

    expect(hashTable.findValue(obj)).toBeUndefined();
    expect(hashTable.findValue(arr)).toBeUndefined();
    expect(hashTable.findValue(func)).toBeUndefined();

});