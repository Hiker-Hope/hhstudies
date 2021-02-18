import {hash} from './index'
import {keyStrings} from '../testData/hash'


test('HASH FUNCTION: returns unique indices for anagrams', () => {
    for (let i = 0; i < keyStrings.length -1; i++) {
        for (let j = i + 1; j < keyStrings.length; j++) {
            expect(hash(keyStrings[i])).not.toBe(hash(keyStrings[j]));
        }
    }
});
