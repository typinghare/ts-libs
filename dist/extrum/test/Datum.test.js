"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Datum_1 = require("../src/Datum");
describe('Test class Datum.', function () {
    it('Basic tests.', function () {
        const numberDatum = new Datum_1.Datum(5);
        // Test default value.
        expect(numberDatum.value).toBe(5);
        expect(numberDatum.getDefaultValue()).toBe(5);
        // Assignment.
        numberDatum.value = 10;
        expect(numberDatum.value).toBe(10);
    });
    it('Test metadata.', function () {
        const stringDatum = new Datum_1.Datum('Hello World!', {
            length: 12,
        });
        // Test default metadata.
        expect(stringDatum.getMeta('length')).toBe(12);
        const booleanDatum = new Datum_1.Datum(true, {
            label: 'Dark Mode',
            description: 'Whether to turn on the dark mode.',
        });
        // Test default metadata.
        expect(booleanDatum.getMeta('label')).toBe('Dark Mode');
        expect(booleanDatum.getMeta('description')).toBe('Whether to turn on the dark mode.');
        booleanDatum.setMeta('label', '夜间模式');
        booleanDatum.setMeta('description', '是否打开夜间模式');
        expect(booleanDatum.getMeta('label')).toBe('夜间模式');
        expect(booleanDatum.getMeta('description')).toBe('是否打开夜间模式');
    });
});
