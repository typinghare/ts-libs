import { HourMinuteSecond } from './HourMinuteSecond'

/**
 * @author James Chan
 */
export class QuickHourMinuteSecond extends HourMinuteSecond {
    /**
     * Creates an hour-minute-second of specified seconds.
     * @param seconds
     */
    static ofSeconds(seconds: number): QuickHourMinuteSecond {
        return new QuickHourMinuteSecond(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * Creates an hour-minute-second of specified minutes.
     * @param minutes
     */
    static ofMinutes(minutes: number): QuickHourMinuteSecond {
        return new QuickHourMinuteSecond(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Creates an hour-minute-second of specified hours.
     * @param hours
     */
    static ofHours(hours: number): QuickHourMinuteSecond {
        return new QuickHourMinuteSecond(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    /**
     * Milliseconds.
     * @private
     */
    private _ms: number

    /**
     * Hours.
     * @private
     */
    private _hour: number = 0

    /**
     * Minutes.
     * @private
     */
    private _minute: number = 0

    /**
     * Seconds.
     * @private
     */
    private _second: number = 0

    /**
     * Creates a quick hour minute second.
     * @param ms time in milliseconds.
     */
    constructor(ms: number);
    /**
     * Creates a quick hour minute second.
     * @param hour hours.
     * @param minute minutes.
     * @param second seconds.
     */
    constructor(hour: number, minute: number, second: number);
    constructor(hour: number, minute ?: number, seconds?: number) {
        super()

        if (minute === undefined || seconds === undefined) {
            this._ms = hour

            this.compute()
        } else {
            this._hour = hour
            this._minute = minute
            this._second = seconds

            this._ms = this._hour * HourMinuteSecond.MILLISECONDS_IN_HOUR +
                this._minute * HourMinuteSecond.MILLISECONDS_IN_MINUTE +
                this.second * HourMinuteSecond.MILLISECONDS_IN_SECOND
        }
    }

    /**
     * Computes hours, minutes, and seconds.
     * @private
     */
    private compute(): void {
        this._hour = Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_HOUR)
        this._minute = Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_MINUTE) % HourMinuteSecond.MINUTE_IN_HOUR
        this._second = Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_SECOND) % HourMinuteSecond.SECOND_IN_MINUTE
    }

    /**
     * @override
     */
    get ms(): number {
        return this._ms
    }

    /**
     * @override
     */
    get hour(): number {
        return this._hour
    }

    /**
     * @override
     */
    get minute(): number {
        return this._minute
    }

    /**
     * @override
     */
    get second(): number {
        return this._second
    }

    /**
     * @override
     */
    consume(hourMinuteSecond: HourMinuteSecond): HourMinuteSecond;
    /**
     * @override
     */
    consume(ms: number): HourMinuteSecond;
    /**
     * @override
     */
    consume(time: number | HourMinuteSecond): HourMinuteSecond {
        const ms = typeof time == 'number' ? time : (time as HourMinuteSecond).ms

        this._ms = Math.max(this._ms - ms, 0)
        this.compute()

        return this
    }

    /**
     * @override
     */
    extend(hourMinuteSecond: HourMinuteSecond): HourMinuteSecond;
    /**
     * @override
     */
    extend(ms: number): HourMinuteSecond;
    /**
     * @override
     */
    extend(time: number | HourMinuteSecond): HourMinuteSecond {
        const ms = typeof time == 'number' ? time : (time as HourMinuteSecond).ms

        this._ms += ms
        this.compute()

        return this
    }

    /**
     * @override
     */
    clone(): QuickHourMinuteSecond {
        return new QuickHourMinuteSecond(this._ms)
    }
}