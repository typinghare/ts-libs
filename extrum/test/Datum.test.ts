import { Datum } from '../src/Datum'

describe('Test class Datum.', function() {
    it('Basic tests.', function() {
        const numberDatum = new Datum(5)

        // Test default value.
        expect(numberDatum.value).toBe(5)
        expect(numberDatum.getDefaultValue()).toBe(5)

        // Assignment.
        numberDatum.value = 10
        expect(numberDatum.value).toBe(10)
    })

    it('Test metadata.', function() {
        const stringDatum = new Datum('Hello World!', {
            length: 12,
        })

        // Test default metadata.
        expect(stringDatum.getMeta('length')).toBe(12)

        interface MyMetadata {
            label: string,
            description: string,
        }

        const booleanDatum = new Datum<boolean, MyMetadata>(true, {
            label: 'Dark Mode',
            description: 'Whether to turn on the dark mode.',
        })

        // Test default metadata.
        expect(booleanDatum.getMeta('label')).toBe('Dark Mode')
        expect(booleanDatum.getMeta('description')).toBe('Whether to turn on the dark mode.')

        booleanDatum.setMeta('label', '夜间模式')
        booleanDatum.setMeta('description', '是否打开夜间模式')
        expect(booleanDatum.getMeta('label')).toBe('夜间模式')
        expect(booleanDatum.getMeta('description')).toBe('是否打开夜间模式')
    })
})