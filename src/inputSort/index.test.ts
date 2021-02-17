import {inputSort} from './index'
import {unsortedArrayData, sortedArrayData} from '../testData/arrays'


test('INPUT SORT: sorts an unsorted array', () => {
    expect(inputSort(unsortedArrayData.unsorted)).toEqual(unsortedArrayData.sorted);
});

test('INPUT SORT: does not change a sorted array', () => {
    expect(inputSort(sortedArrayData.one)).toEqual(sortedArrayData.one);
});