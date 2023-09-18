"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
describe('Test HourMinuteSecond', () => {
    it('Test the create method.', () => {
        const slowTime = main_1.HourMinuteSecond.create(1000);
        expect(slowTime).toBeInstanceOf(main_1.SlowHourMinuteSecond);
        main_1.HourMinuteSecond.setStaticInitiateClass(main_1.QuickHourMinuteSecond);
        const quickTime = main_1.HourMinuteSecond.create(1000);
        expect(quickTime).toBeInstanceOf(main_1.QuickHourMinuteSecond);
        // Test passing no parameters
        const time = main_1.HourMinuteSecond.create();
        expect(time.ms).toBe(0);
    });
    it('Test ofSeconds, ofMinutes, and ofHours.', () => {
        const time1 = main_1.HourMinuteSecond.ofSeconds(32);
        const time2 = main_1.HourMinuteSecond.ofMinutes(15);
        const time3 = main_1.HourMinuteSecond.ofHours(1);
        expect(time1.second).toBe(32);
        expect(time2.minute).toBe(15);
        expect(time3.hour).toBe(1);
    });
});
