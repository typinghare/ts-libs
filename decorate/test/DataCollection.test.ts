import { DataCollection } from '../src/DataCollection'
import { Datum } from '../src/Datum'

describe('Test class DataCollection.', function() {
    it('Basic tests.', function() {
        type MyData = {
            username: string,
            age: number,
            gender: 'male' | 'female' | 'non-binary' | 'other'
        }

        const dataCollector = new DataCollection<MyData>({
            username: new Datum('James Chan'),
            age: new Datum(24),
            gender: new Datum('male'),
        })

        expect(dataCollector.getDatum('username')).toBeInstanceOf(Datum)
        expect(dataCollector.getDatum('age').value).toBe(24)
        expect(dataCollector.getValue('gender')).toBe('male')

        // Get data.
        const data = dataCollector.getData()
        expect(Object.keys(data).length).toBe(3)
    })
})