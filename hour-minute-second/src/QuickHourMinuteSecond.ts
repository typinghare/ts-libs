import { HourMinuteSecond } from './HourMinuteSecond'

/**
 * @author James Chan
 */
export class QuickHourMinuteSecond extends HourMinuteSecond {
    /**
     * Milliseconds.
     * @private
     */
    private _ms: number

    /**
     * Hours.
     * @private
     */
    private _hour: number

    /**
     * Minutes.
     * @private
     */
    private _minute: number

    /**
     * Seconds.
     * @private
     */
    private _second: number

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

            this._hour = Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_HOUR)
            this._minute = Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_MINUTE)
            this._second = Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_SECOND)
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
        this._minute = Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_MINUTE)
        this._second = Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * Computes ms.
     * @private
     */
    private computeMs(): void {
        this._ms = this._hour * HourMinuteSecond.MILLISECONDS_IN_HOUR +
            this._minute * HourMinuteSecond.MILLISECONDS_IN_MINUTE +
            this.second * HourMinuteSecond.MILLISECONDS_IN_SECOND
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
    consume(hourMinuteSecond: HourMinuteSecond): void;
    /**
     * @override
     */
    consume(ms: number): void;
    /**
     * @override
     */
    consume(time: number | HourMinuteSecond): void {
        const ms = typeof time == 'number' ? time : (time as HourMinuteSecond).ms

        this._ms -= ms
        this.compute()
    }

    /**
     * @override
     */
    extend(hourMinuteSecond: HourMinuteSecond): void;
    /**
     * @override
     */
    extend(ms: number): void;
    /**
     * @override
     */
    extend(time: number | HourMinuteSecond): void {
        const ms = typeof time == 'number' ? time : (time as HourMinuteSecond).ms

        this._ms += ms
        this.compute()
    }

    /**
     * @override
     */
    clone(): QuickHourMinuteSecond {
        return new QuickHourMinuteSecond(this._ms)
    }
}