import {binarySearch} from './index'

const arrSorted = [1, 1, 2, 2, 3, 4, 5, 6, 7, 8];
const arrNotSorted = [1, 3, 5, 21, 11, 2, 34, 242, 3, 423, 53, 74, 18];


test('finds an element in the sorted array', () => {
    expect(binarySearch(arrSorted, 2)).toBe(true);
});

test('does not find an element in the unsorted array', () => {
    expect(binarySearch(arrNotSorted, 2)).toBe(false);
});