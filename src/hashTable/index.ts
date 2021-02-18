const hash = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i) * i;
    }
    return hash;
}
console.log(hash('name'))
console.log(hash('anme'))
console.log(hash('mean'))