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

    it('Test clone.', function() {
        const hourMinuteSecond = new SlowHourMinuteSecond(30030000)
        const cloneHourMinuteSecond = hourMinuteSecond.clone()

        hourMinuteSecond.consume(117000)

        expect(cloneHourMinuteSecond.hour).toBe(8)
        expect(cloneHourMinuteSecond.minute).toBe(20)
        expect(cloneHourMinuteSecond.second).toBe(30)
    })

    it('Test toString.', function() {
        expect(new SlowHourMinuteSecond(30008000).toString()).toBe('08:20:08')
        expect(new SlowHourMinuteSecond(387000).toString()).toBe('00:06:27')

    })

    it('Test of.', function() {
        expect(SlowHourMinuteSecond.ofSeconds(100).second).toBe(40)
        expect(SlowHourMinuteSecond.ofMinutes(50).minute).toBe(50)
        expect(SlowHourMinuteSecond.ofHours(10).hour).toBe(10)
    })
})