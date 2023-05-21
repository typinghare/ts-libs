import { HourMinuteSecond } from '@typinghare/hour-minute-second'

/**
 * A callback function being invoked when the clock's time runs out. If the return value is HourMinuteSecond, it will
 * be set to be the new time, and the clock continues.
 */
export type TimeUpCallback = () => HourMinuteSecond | undefined

/**
 * Game clock. The time will be updated when being got.
 * @author James Chan
 */
export class Clock {
    /**
     * Remaining time.
     * @private
     */
    private _time: HourMinuteSecond

    /**
     * The time up callback function.
     * @private
     */
    private readonly _timeUpCallback: TimeUpCallback

    /**
     * The timestamp of the last updated time.
     * @private
     */
    private _updatedTimestamp?: number

    /**
     * Timeout handle.
     * @private
     */
    private _timeoutHandle ?: NodeJS.Timeout

    /**
     * Creates a clock.
     * @param initialTime initial time.
     * @param timeUpCallback the timestamp of the last updated time.
     */
    constructor(initialTime: HourMinuteSecond, timeUpCallback: TimeUpCallback) {
        this._time = initialTime.clone()
        this._timeUpCallback = timeUpCallback
    }

    /**
     * Sets time.
     * @param time time to set.
     */
    set time(time: HourMinuteSecond) {
        this._time = time.clone()
    }

    /**
     * Returns current time. Time will be updated before returning.
     */
    get time(): HourMinuteSecond {
        this.updateTime()

        return this._time.clone()
    }

    /**
     * Whether this clock is running.
     */
    isRunning(): boolean {
        return this._updatedTimestamp !== undefined
    }

    /**
     * Updates the time.
     * @private
     */
    private updateTime(): void {
        if (!this.isRunning()) return

        const currentTime = new Date().getTime()
        const difference = currentTime - this._updatedTimestamp!
        if (difference > 0) {
            this._time.consume(difference)
            this._updatedTimestamp = currentTime
        }
    }

    /**
     * Resumes this clock.
     */
    resume(): void {
        this._updatedTimestamp = new Date().getTime()
        this._timeoutHandle = setTimeout(() => {
            const newTime: HourMinuteSecond | undefined = this._timeUpCallback()
            if (newTime) {
                this.time = newTime
            }
        }, this._time.ms)
    }

    /**
     * Pauses this clock.
     */
    pause(): void {
        // Subtracts time.
        if (this._updatedTimestamp) {
            this.updateTime()
            this._updatedTimestamp = undefined
        }

        // Stops timeout handle.
        if (this._timeoutHandle) {
            clearTimeout(this._timeoutHandle)
            this._timeoutHandle = undefined
        }
    }
}