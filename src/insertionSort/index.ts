export const insertionSort = (array: number[]): number[] => {
    let currentValue = 0;
    for (let i = 1; i < array.length; i++) {
        currentValue = array[i];

        for (let inputIndex = i; inputIndex > 0; inputIndex--) {
            if (currentValue < array[inputIndex - 1]) {
                array[inputIndex] = array[inputIndex - 1];
            } else {
                array[inputIndex] = currentValue;
                break;
            }
        }
    }

    return array;
};