"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InitializableHolder_1 = require("../src/InitializableHolder");
describe('Test InitializableHolder.', function () {
    it('Test initialize().', function () {
        const holder = InitializableHolder_1.InitializableHolder.of();
        expect(holder.isUndefined()).toBe(true);
        holder.initialize(() => 'value');
        expect(holder.get()).toBe('value');
        holder.initialize(() => 'another value');
        expect(holder.get()).toBe('value');
    });
    it('Test hasInitialized().', function () {
        const holder = InitializableHolder_1.InitializableHolder.of();
        expect(holder.hasInitialized()).toBe(false);
        holder.initialize(() => 'value');
        expect(holder.hasInitialized()).toBe(true);
    });
});
