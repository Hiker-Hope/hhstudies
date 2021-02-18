import {insertionSort} from './index'
import {unsortedArrayData, sortedArrayData} from '../testData/arrays'


test('INSERTION SORT: sorts an unsorted array', () => {
    expect(insertionSort(unsortedArrayData.unsorted)).toEqual(unsortedArrayData.sorted);
});

test('INSERTION SORT: does not change a sorted array', () => {
    expect(insertionSort(sortedArrayData.one)).toEqual(sortedArrayData.one);
});