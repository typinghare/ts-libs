import { DataCollection } from '../src/DataCollection'
import { Datum } from '../src/Datum'

describe('Test class DataCollection.', function() {
    it('Basic tests.', function() {
        type MyData = {
            username: string,
            age: number,
            gender: 'male' | 'female' | 'non-binary' | 'other'
        }

        const dataCollection = new DataCollection<MyData>({
            username: new Datum('James Chan'),
            age: new Datum(24),
            gender: new Datum('male'),
        })

        expect(dataCollection.getDatum('username')).toBeInstanceOf(Datum)
        expect(dataCollection.getDatum('age').value).toBe(24)
        expect(dataCollection.getValue('gender')).toBe('male')

        // Get data
        const data = dataCollection.getData()
        expect(Object.keys(data).length).toBe(3)

        // Check if a name exist
        expect(dataCollection.exist('username')).toBe(true)
        expect(dataCollection.exist('password')).toBe(false)

        // Get datum list
        expect(dataCollection.getDatumList().length).toBe(3)
    })

    it('Test metadata.', () => {
        type MyData = {
            username: string,
            age: number
        }

        const dataCollection = new DataCollection<MyData>({
            username: new Datum('James Chan', {
                public: true,
            }),
            age: new Datum(24, {
                public: false,
            }),
        })

        expect(dataCollection.getMetadata('username')).toMatchObject({ public: true })
        expect(dataCollection.getMetadata('age').public).toBe(false)
    })
})