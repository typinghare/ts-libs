import { HourMinuteSecond, QuickHourMinuteSecond, SlowHourMinuteSecond } from '../src/main'

describe('Test HourMinuteSecond', () => {
    it('Test the create method.', () => {
        const slowTime = HourMinuteSecond.create(1000)
        expect(slowTime).toBeInstanceOf(SlowHourMinuteSecond)

        HourMinuteSecond.setStaticInitiateClass(QuickHourMinuteSecond)
        const quickTime = HourMinuteSecond.create(1000)
        expect(quickTime).toBeInstanceOf(QuickHourMinuteSecond)

        // Test passing no parameters
        const time = HourMinuteSecond.create()
        expect(time.ms).toBe(0)
    })

    it('Test ofSeconds, ofMinutes, and ofHours.', () => {
        const time1 = HourMinuteSecond.ofSeconds(32)
        const time2 = HourMinuteSecond.ofMinutes(15)
        const time3 = HourMinuteSecond.ofHours(1)

        expect(time1.second).toBe(32)
        expect(time2.minute).toBe(15)
        expect(time3.hour).toBe(1)
    })
})