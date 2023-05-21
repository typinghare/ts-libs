import { SlowHourMinuteSecond } from '../src/SlowHourMinuteSecond'

describe('Test SlowHourMinuteSecond.', function() {
    it('Test getting hours, minutes, and seconds.', function() {
        const hourMinuteSecond = new SlowHourMinuteSecond(4532500)

        expect(hourMinuteSecond.hour).toBe(1)
        expect(hourMinuteSecond.minute).toBe(15)
        expect(hourMinuteSecond.second).toBe(32)
    })

    it('Test consume and extend.', function() {
        const hourMinuteSecond = new SlowHourMinuteSecond(4532000)
        hourMinuteSecond.extend(1200)

        expect(hourMinuteSecond.hour).toBe(1)
        expect(hourMinuteSecond.minute).toBe(15)
        expect(hourMinuteSecond.second).toBe(33)

        hourMinuteSecond.consume(329000)
        expect(hourMinuteSecond.hour).toBe(1)
        expect(hourMinuteSecond.minute).toBe(10)
        expect(hourMinuteSecond.second).toBe(4)
    })

    it('Test consume and extend using HourMinuteSecond.', function() {
        const hourMinuteSecond = new SlowHourMinuteSecond(4532000)
        hourMinuteSecond.extend(new SlowHourMinuteSecond(8245000))

        expect(hourMinuteSecond.hour).toBe(3)
        expect(hourMinuteSecond.minute).toBe(32)
        expect(hourMinuteSecond.second).toBe(57)

        hourMinuteSecond.consume(new SlowHourMinuteSecond(4040000))
        expect(hourMinuteSecond.hour).toBe(2)
        expect(hourMinuteSecond.minute).toBe(25)
        expect(hourMinuteSecond.second).toBe(37)
    })
})