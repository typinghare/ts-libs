import { HourMinuteSecond } from './HourMinuteSecond'

/**
 * @author James Chan
 */
export class SlowHourMinuteSecond extends HourMinuteSecond {
    /**
     * Creates a slow hour minute second.
     * @param ms time in milliseconds.
     */
    constructor(ms: number) {
        super()
        this._ms = ms
    }

    /**
     * Milliseconds.
     * @private
     */
    private _ms: number

    override get ms(): number {
        return this._ms
    }

    override get hour(): number {
        return Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    override get minute(): number {
        return Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_MINUTE) % HourMinuteSecond.MINUTE_IN_HOUR
    }

    override get second(): number {
        return Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_SECOND) % HourMinuteSecond.SECOND_IN_MINUTE
    }

    /**
     * Creates an hour-minute-second instance of specified seconds.
     * @param seconds
     */
    static ofSeconds(seconds: number): SlowHourMinuteSecond {
        return new SlowHourMinuteSecond(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * Creates an hour-minute-second instance of specified minutes.
     * @param minutes
     */
    static ofMinutes(minutes: number): SlowHourMinuteSecond {
        return new SlowHourMinuteSecond(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Creates an hour-minute-second instance of specified hours.
     * @param hours
     */
    static ofHours(hours: number): SlowHourMinuteSecond {
        return new SlowHourMinuteSecond(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    override consume(hourMinuteSecond: HourMinuteSecond): this
    override consume(ms: number): this
    override consume(time: number | HourMinuteSecond): this {
        const ms = typeof time == 'number' ? time : (time as HourMinuteSecond).ms
        this._ms -= ms

        return this
    }

    override extend(hourMinuteSecond: HourMinuteSecond): this
    override extend(ms: number): this
    override extend(time: number | HourMinuteSecond): this {
        const ms = typeof time == 'number' ? time : (time as HourMinuteSecond).ms
        this._ms += ms

        return this
    }

    override clone(): SlowHourMinuteSecond {
        return new SlowHourMinuteSecond(this._ms)
    }
}