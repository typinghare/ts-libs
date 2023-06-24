import { Holder } from '../src/Holder'

describe('Test holder.', function(): void {
    it('Test isUndefined().', function(): void {
        const holder = Holder.of<string>()
        expect(holder.isUndefined()).toBe(true)
    })

    it('Test of(value).', function(): void {
        const holder = Holder.of<string>('Some content...')
        expect(holder.isUndefined()).toBe(false)
        expect(holder.get()).toBe('Some content...')
    })

    it('Test assign().', function(): void {
        const holder = Holder.of<string>()
        holder.assign('Some content...')
        expect(holder.get()).toBe('Some content...')
    })

    it('Test getOrDefault().', function(): void {
        const holder = Holder.of<number>()
        expect(holder.getOrDefault(5)).toBe(5)

        holder.assign(10)
        expect(holder.getOrDefault(15)).toBe(10)
    })

    it('Test getOrThrow() when the value is undefined.', function(): void {
        const holder = Holder.of<number>()

        expect((): void => {
            holder.getOrThrow(() => new Error('No content!'))
        }).toThrow(Error)
    })

    it('Test getOrThrow() when the value is not undefined.', function(): void {
        const holder = Holder.of<number>(10)
        expect(holder.getOrThrow(() => new Error('No content!'))).toBe(10)
    })

    it('should ', function(): void {
        const person = {
            name: 'James Chan',
        }

        // Any code ...

        console.dir(Object.getPrototypeOf(person)) // log "James Chan" instead of "{ name: 'James Chan' }"
    })
})