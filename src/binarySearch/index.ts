export const binarySearch = (array, number) => {
    let arrayStartIndex = 0
    let arrayEndIndex = array.length - 1

    while (arrayStartIndex <= arrayEndIndex) {
        let middle = Math.floor((arrayStartIndex + arrayEndIndex) / 2)
        let attempt = array[middle]

        if (attempt === number) {
            console.log('found')
            return true
        }

        if (attempt > number) {
            arrayEndIndex = middle - 1
        } else {
            arrayStartIndex = middle + 1
        }
    }
    console.log('not found')
    return false
}