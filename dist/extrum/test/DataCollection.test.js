"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DataCollection_1 = require("../src/DataCollection");
const Datum_1 = require("../src/Datum");
describe('Test class DataCollection.', function () {
    it('Basic tests.', function () {
        const dataCollection = new DataCollection_1.DataCollection({
            username: new Datum_1.Datum('James Chan'),
            age: new Datum_1.Datum(24),
            gender: new Datum_1.Datum('male'),
        });
        expect(dataCollection.getDatum('username')).toBeInstanceOf(Datum_1.Datum);
        expect(dataCollection.getDatum('age').value).toBe(24);
        expect(dataCollection.getValue('gender')).toBe('male');
        // Get data
        const data = dataCollection.getData();
        expect(Object.keys(data).length).toBe(3);
        // Check if a name exist
        expect(dataCollection.exist('username')).toBe(true);
        expect(dataCollection.exist('password')).toBe(false);
        // Get datum list
        expect(dataCollection.getDatumList().length).toBe(3);
    });
    it('Test metadata.', () => {
        const dataCollection = new DataCollection_1.DataCollection({
            username: new Datum_1.Datum('James Chan', {
                public: true,
            }),
            age: new Datum_1.Datum(24, {
                public: false,
            }),
        });
        expect(dataCollection.getMetadata('username')).toMatchObject({ public: true });
        expect(dataCollection.getMetadata('age').public).toBe(false);
    });
});
