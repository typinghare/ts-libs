import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

/**
 * A callback function being invoked when the clock's time runs out. If the return value is HourMinuteSecond, it will
 * be set to be the new time, and the clock continues.
 */
export type TimeUpCallback = (this: Clock) => HourMinuteSecond | undefined

/**
 * A callback function being invoked before the clock is resume.
 */
export type BeforeResume = (this: Clock) => void

/**
 * A callback function being invoked after the clock is paused.
 */
export type BeforePause = (this: Clock) => void

/**
 * Game clock. The time will be updated when being retrieved. When the time runs out, the clock will stop and invoke
 * the time up callback function.
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

    private _beforeResume ?: BeforeResume

    private _beforePause ?: BeforePause

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
     * Returns the prototype time.
     */
    get prototypeTime(): HourMinuteSecond {
        return this._time
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

            if (this._time.ms <= 0) {
                this._time = SlowHourMinuteSecond.ofSeconds(0)
                this.pause()
            }
        }
    }

    /**
     * Resumes this clock.
     */
    resume(): void {
        this._beforeResume?.call(this)

        this._updatedTimestamp = new Date().getTime()
        this._timeoutHandle = setTimeout((): void => {
            this.pause()
            const newTime: HourMinuteSecond | undefined = this._timeUpCallback.call(this)
            if (newTime !== undefined) {
                this.time = newTime
                this.resume()
            }
        }, this._time.ms)
    }

    /**
     * Pauses this clock.
     */
    pause(): void {
        this._beforePause?.call(this)

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

    /**
     * Sets before resume call back function.
     * @param beforeResume
     */
    set beforeResume(beforeResume: BeforeResume | undefined) {
        this._beforeResume = beforeResume
    }

    /**
     * Sets before pause callback function.
     * @param beforePause
     */
    set beforePause(beforePause: BeforePause | undefined) {
        this._beforePause = beforePause
    }
}