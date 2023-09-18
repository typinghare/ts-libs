"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Holder_1 = require("../src/Holder");
describe('Test holder.', function () {
    it('Test isUndefined().', function () {
        const holder = Holder_1.Holder.of();
        expect(holder.isUndefined()).toBe(true);
    });
    it('Test of(value).', function () {
        const holder = Holder_1.Holder.of('Some content...');
        expect(holder.isUndefined()).toBe(false);
        expect(holder.get()).toBe('Some content...');
    });
    it('Test assign().', function () {
        const holder = Holder_1.Holder.of();
        holder.assign('Some content...');
        expect(holder.get()).toBe('Some content...');
    });
    it('Test getOrDefault().', function () {
        const holder = Holder_1.Holder.of();
        expect(holder.getOrDefault(5)).toBe(5);
        holder.assign(10);
        expect(holder.getOrDefault(15)).toBe(10);
    });
    it('Test getOrThrow() when the value is undefined.', function () {
        const holder = Holder_1.Holder.of();
        expect(() => {
            holder.getOrThrow(() => new Error('No content!'));
        }).toThrow(Error);
    });
    it('Test getOrThrow() when the value is not undefined.', function () {
        const holder = Holder_1.Holder.of(10);
        expect(holder.getOrThrow(() => new Error('No content!'))).toBe(10);
    });
    it('should ', function () {
        const person = {
            name: 'James Chan',
        };
        // Any code ...
        console.dir(Object.getPrototypeOf(person)); // log "James Chan" instead of "{ name: 'James Chan' }"
    });
});
