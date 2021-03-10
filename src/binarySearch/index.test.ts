import {binarySearch} from './index'
import {sortedArrayData, unsortedArrayData} from '../testData/arrays'


test('BINARY SEARCH: finds an element in the sorted array', () => {
    expect(binarySearch(sortedArrayData.one, 7)).toBe(6);
    expect(binarySearch(sortedArrayData.two, 23)).toBe(2);
});

test('BINARY SEARCH: returns undefined for a missing element in an array', () => {
    expect(binarySearch(sortedArrayData.two, 123)).toBe(-1);
});

// сомнительный тест, иногда может и найти (случайно)
test('BINARY SEARCH: returns undefined for an unsorted array', () => {
    expect(binarySearch(unsortedArrayData.unsorted, 21)).toBe(-1);
});