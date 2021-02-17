export const binarySearch = (array: number[], numberToFind: number): number | undefined => {
    let searchArrayStartIndex = 0;
    let searchArrayEndIndex = array.length - 1;

    while (searchArrayStartIndex < searchArrayEndIndex) {

        const arrayMiddle = Math.floor((searchArrayStartIndex + searchArrayEndIndex) / 2);
        const middleNumber = array[arrayMiddle];

        if (middleNumber === numberToFind) {
            return arrayMiddle;
        }

        if (middleNumber > numberToFind) {
            searchArrayEndIndex = arrayMiddle - 1;
        } else {
            searchArrayStartIndex = arrayMiddle + 1;
        }
    }

    return undefined;
}