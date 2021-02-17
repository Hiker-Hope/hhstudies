export const inputSort = (array: number[]): number[] => {
    for (let i = 1; i < array.length; i++) {

        const currentValue = array[i];
        let inputIndex = i;

        while (currentValue < array[inputIndex - 1] && inputIndex > 0) {
            array[inputIndex] = array[inputIndex - 1];
            inputIndex--;
        }

        array[inputIndex] = currentValue;
    }

    return array;
};