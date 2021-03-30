import {keyToString, hash, HashTable} from './index'
import {keyStrings, keys, keysAsStrings} from '../testData/hash'


test('HASH FUNCTION: returns unique indices for anagrams', () => {
    for (let i = 0; i < keyStrings.length -1; i++) {
        for (let j = i + 1; j < keyStrings.length; j++) {
            expect(hash(keyStrings[i])).not.toBe(hash(keyStrings[j]));
        }
    }
});

test('KEY TO STRING FUNCTION: returns string for objects, arrays and functions', () => {
    expect(keyToString([2,4,6,'p'])).toBe('2,4,6,p');
    expect(keyToString({j: 1, k: 'k'})).toBe('j_1');
    expect(keyToString(() => {})).toBe('() => {}');
});

test('KEY TO STRING FUNCTION: returns strings for various types of keys', () => {
    for (let i = 0; i < keys.length -1; i++) {
        expect(keyToString(keys[i])).toBe(keysAsStrings[i]);
    }
});

test('HASH TABLE: adds and finds values', () => {
    const hashTable = new HashTable(10);

    const obj = {hey: 'juice'};
    const func = () => {console.log('hello')};
    const arr = [false, 2,4]

    hashTable.addValue('juice', 150);
    hashTable.addValue('milk', 30);
    hashTable.addValue('oranges', 200);
    hashTable.addValue('butter', 100);
    hashTable.addValue(false, 300);
    hashTable.addValue(405, 350);
    hashTable.addValue(9007199254740991n, 'hey there');
    hashTable.addValue(obj, 2224);
    hashTable.addValue(func, 3050);
    hashTable.addValue(arr, 11111);

    const keys = ['juice', 'milk', 'oranges', 'butter', false, 405, 9007199254740991n, obj, func, arr];
    const values = [150, 30, 200, 100, 300, 350, 'hey there', 2224, 3050, 11111];

    keys.forEach((key, index) => {
        expect(hashTable.findValue(key)).not.toBeUndefined();
        expect(hashTable.findValue(key)).toBe(values[index]);
    })
});

test('HASH TABLE: resizes when filled by more than 60%', () => {
    const initialSize = 8;
    const hashTable = new HashTable(initialSize);

    const obj = {hey: 'juice'};
    const func = () => {console.log('hello')};
    const arr = [false, 2,4]

    hashTable.addValue('juice', 150);
    hashTable.addValue('milk', 30);
    hashTable.addValue('oranges', 200);
    hashTable.addValue('butter', 100);
    hashTable.addValue('1juice', 150);
    hashTable.addValue('1milk', 30);
    hashTable.addValue('1oranges', 200);
    hashTable.addValue('1butter', 100);
    hashTable.addValue(false, 300);
    hashTable.addValue(405, 350);
    hashTable.addValue(9007199254740991n, 'hey there');
    hashTable.addValue(obj, 2224);
    hashTable.addValue(func, 3050);
    hashTable.addValue(arr, 11111);
    hashTable.addValue(900719925474094, 'hey there');

    keys.forEach((key, index) => {
        expect(hashTable.storage.length).toBe(initialSize * 4 -1);
    })
});


test('HASH TABLE: updates values with identical keys', () => {
    const hashTable = new HashTable(6);

    const obj = {hey: 'juice'};
    const func = () => {console.log('hello')};
    const arr = [false, 2,4]

    hashTable.addValue('butter', 'cheap');
    hashTable.addValue(9007199254740991n, 'hey there');
    hashTable.addValue(obj, 111);
    hashTable.addValue(func, 30);
    hashTable.addValue(arr, 30);

    hashTable.addValue('butter', 'expensive');
    hashTable.addValue(9007199254740991n, 'bye there');
    hashTable.addValue(obj, 222);
    hashTable.addValue(func, 300);
    hashTable.addValue(arr, 305);

    const keys = ['butter', obj, 9007199254740991n, func, arr];
    const values = ['expensive', 222, 'bye there', 300, 305];

    keys.forEach((key, index) => {
        expect(hashTable.findValue(key)).not.toBeUndefined();
        expect(hashTable.findValue(key)).toBe(values[index]);
    })
});

test('HASH TABLE: removes values', () => {
    const hashTable = new HashTable(10);

    const obj = {hey: 'juice'};
    const func = () => {console.log('hello')};
    const arr = [false, 2,4]

    hashTable.addValue('juice', 150);
    hashTable.addValue('milk', 30);
    hashTable.addValue(false, 30);
    hashTable.addValue(405, 30);
    hashTable.addValue(obj, 30);
    hashTable.addValue(func, 30);
    hashTable.addValue(arr, 30);
    hashTable.removeValue('juice');
    hashTable.removeValue(false);
    hashTable.removeValue(405);
    hashTable.removeValue(arr);
    hashTable.removeValue(obj);
    hashTable.removeValue(func);


    expect(hashTable.findValue('milk')).not.toBeUndefined();
    expect(hashTable.findValue('juice')).toBeUndefined();
    expect(hashTable.findValue(405)).toBeUndefined();
    expect(hashTable.findValue(false)).toBeUndefined();
    expect(hashTable.findValue(arr)).toBeUndefined();
    expect(hashTable.findValue(obj)).toBeUndefined();
    expect(hashTable.findValue(func)).toBeUndefined();
});

test('HASH TABLE: adds values with not primitive keys', () => {
    const hashTable = new HashTable(10);

    const obj = {hey: 'juice'};
    const func = () => {};
    const arr = [false, 2,4]

    hashTable.addValue(obj, 150);
    hashTable.addValue(arr, 30);
    hashTable.addValue(func, 30);

    expect(hashTable.findValue(obj)).not.toBeUndefined();
    expect(hashTable.findValue(obj)).toBe(150);
    expect(hashTable.findValue(arr)).not.toBeUndefined();
    expect(hashTable.findValue(arr)).toBe(30);
    expect(hashTable.findValue(func)).not.toBeUndefined();
    expect(hashTable.findValue(func)).toBe(30);

});