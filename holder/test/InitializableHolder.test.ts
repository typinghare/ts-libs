import { InitializableHolder } from '../src/InitializableHolder'

describe('Test InitializableHolder.', function(): void {
    it('Test initialize().', function(): void {
        const holder = InitializableHolder.of<string>()
        expect(holder.isUndefined()).toBe(true)

        holder.initialize((): string => 'value')
        expect(holder.get()).toBe('value')

        holder.initialize((): string => 'another value')
        expect(holder.get()).toBe('value')
    })

    it('Test hasInitialized().', function(): void {
        const holder = InitializableHolder.of<string>()
        expect(holder.hasInitialized()).toBe(false)

        holder.initialize((): string => 'value')
        expect(holder.hasInitialized()).toBe(true)
    })
})