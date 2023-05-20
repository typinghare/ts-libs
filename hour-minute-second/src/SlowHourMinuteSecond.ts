import { HourMinuteSecond } from './HourMinuteSecond'

/**
 * @author James Chan
 */
export class SlowHourMinuteSecond extends HourMinuteSecond {
    /**
     * Milliseconds.
     * @private
     */
    private _ms: number

    /**
     * Creates a slow hour minute second.
     * @param ms time in milliseconds.
     */
    constructor(ms: number) {
        super()
        this._ms = ms
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
        return Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    /**
     * @override
     */
    get minute(): number {
        return Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_MINUTE)
    }

    /**
     * @override
     */
    get second(): number {
        return Math.floor(this._ms / HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * @override
     */
    consume(hourMinuteSecond: HourMinuteSecond): void
    /**
     * @override
     */
    consume(ms: number): void
    /**
     * @override
     */
    consume(time: number | HourMinuteSecond): void {
        const ms = typeof time == 'number' ? time : (time as HourMinuteSecond).ms

        this._ms -= ms
    }

    /**
     * @override
     */
    extend(hourMinuteSecond: HourMinuteSecond): void
    /**
     * @override
     */
    extend(ms: number): void
    /**
     * @override
     */
    extend(time: number | HourMinuteSecond): void {
        const ms = typeof time == 'number' ? time : (time as HourMinuteSecond).ms

        this._ms += ms
    }

    /**
     * @override
     */
    clone(): SlowHourMinuteSecond {
        return new SlowHourMinuteSecond(this._ms)
    }
}