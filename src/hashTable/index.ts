// TODO всё ещё есть возможность получения одинаковых индексов для разных ключей

export const hash = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i) * i;
    }
    return hash;
}
