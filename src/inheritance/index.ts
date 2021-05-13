abstract class AbstractCache<K, V> {
    abstract getValue(key: K): V;
    abstract getMap(): Map<K, V>;
}

abstract class PeriodicallyUpdatedCache<K, V> extends AbstractCache<K, V> {
    private map: Map<K, V> = new Map();

    protected constructor() {
        super();
    }

    protected update(frequency: number) {
        this.map = this.getMap();

        setTimeout(() => {
            this.update(frequency);
        }, frequency);
    }

    getValue(key: K): V {
        const value = this.map.get(key);

        if (value === undefined) throw new Error('No such key');

        return value;
    }
}

class UsersCache<K, V> extends PeriodicallyUpdatedCache<K, V> {
    userProvider: UserProvider<K, V>;

    constructor(userProvider: UserProvider<K, V>) {
        super();
        this.userProvider = userProvider;
        this.update(5000);
    }

    getMap(): Map<K, V> {
        return this.userProvider.getUsers();
    }
}

class UserProvider<K, V> {
    getUsers(): Map<K, V> {
        const result = new Map();
        result.set(0, {name: 'Anna'});

        return result;
    }
}

const usersCache = new UsersCache<number, { name: string }>(new UserProvider());
const user = usersCache.getValue(0);
console.log(user);