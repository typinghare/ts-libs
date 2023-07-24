import { QuickHourMinuteSecond } from '../src/main'

describe('Test QuickHourMinuteSecond.', function() {
    it('Test getting hours, minutes, and seconds.', function() {
        const hourMinuteSecond = new QuickHourMinuteSecond(4532500)

        expect(hourMinuteSecond.hour).toBe(1)
        expect(hourMinuteSecond.minute).toBe(15)
        expect(hourMinuteSecond.second).toBe(32)
    })

    it('Test consume and extend.', function() {
        const hourMinuteSecond = new QuickHourMinuteSecond(4532000)
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
        const hourMinuteSecond = new QuickHourMinuteSecond(4532000)
        hourMinuteSecond.extend(new QuickHourMinuteSecond(2, 17, 25))

        expect(hourMinuteSecond.hour).toBe(3)
        expect(hourMinuteSecond.minute).toBe(32)
        expect(hourMinuteSecond.second).toBe(57)

        hourMinuteSecond.consume(new QuickHourMinuteSecond(1, 7, 20))
        expect(hourMinuteSecond.hour).toBe(2)
        expect(hourMinuteSecond.minute).toBe(25)
        expect(hourMinuteSecond.second).toBe(37)
    })

    it('Test extendSecond, consumeMinute, and consumeHour.', function() {
        const hourMinuteSecond = new QuickHourMinuteSecond(8, 20, 30)
        hourMinuteSecond.extendHour(3)

        expect(hourMinuteSecond.hour).toBe(11)

        hourMinuteSecond.extendMinute(16)
        expect(hourMinuteSecond.minute).toBe(36)

        hourMinuteSecond.extendSecond(10)
        expect(hourMinuteSecond.second).toBe(40)
    })

    it('Test consumeSecond, consumeMinute, and consumeHour.', function() {
        const hourMinuteSecond = new QuickHourMinuteSecond(8, 20, 30)
        hourMinuteSecond.consumeHour(3)

        expect(hourMinuteSecond.hour).toBe(5)

        hourMinuteSecond.consumeMinute(16)
        expect(hourMinuteSecond.minute).toBe(4)

        hourMinuteSecond.consumeSecond(10)
        expect(hourMinuteSecond.second).toBe(20)
    })

    it('Test clone.', function() {
        const hourMinuteSecond = new QuickHourMinuteSecond(8, 20, 30)
        const cloneHourMinuteSecond = hourMinuteSecond.clone()

        hourMinuteSecond.consume(117000)

        expect(cloneHourMinuteSecond.hour).toBe(8)
        expect(cloneHourMinuteSecond.minute).toBe(20)
        expect(cloneHourMinuteSecond.second).toBe(30)
    })

    it('Test toString.', function() {
        expect(new QuickHourMinuteSecond(8, 20, 8).toString()).toBe('08:20:08')
        expect(new QuickHourMinuteSecond(0, 6, 27).toString()).toBe('00:06:27')

    })

    it('Test of.', function() {
        expect(QuickHourMinuteSecond.ofSeconds(100).second).toBe(40)
        expect(QuickHourMinuteSecond.ofMinutes(50).minute).toBe(50)
        expect(QuickHourMinuteSecond.ofHours(10).hour).toBe(10)
    })
})