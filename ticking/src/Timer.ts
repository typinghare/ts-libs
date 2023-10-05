import { StopwatchWrapper } from './StopwatchWrapper'
import { Callback } from './types'

export interface TimerOptions {
    autoDestruct?: boolean
}

export class Timer extends StopwatchWrapper {
    /**
     * The ID of the interval.
     * @private
     */
    private intervalId: any

    /**
     * Creates a timer.
     * @param countdownMs The countdown in milliseconds of this timer.
     * @param callback Callback function fired in the countdown.
     * @param options Timer options.
     */
    public constructor(
        private countdownMs: number,
        private readonly callback: Callback<Timer>,
        private readonly options ?: TimerOptions,
    ) {
        super()
        this.setInterval()
    }

    /**
     * Sets a new countdown.
     * Sets a new countdown.
     * @param countdownMs The new countdown in milliseconds.
     */
    public setCountdown(countdownMs: number): void {
        this.countdownMs = countdownMs
    }

    /**
     * Returns countdown in milliseconds.
     */
    public getCountdownMs(): number {
        return this.countdownMs
    }

    public override destruct(): void {
        this.clearInterval()
        super.destruct()
    }

    /**
     * Sets the interval.
     * @private
     */
    private setInterval(): void {
        this.clearInterval()

        const leastRemainingCountdown: number = this.countdownMs - this.stopwatch.getDuration()
        const autoDestroy: boolean = this.options?.autoDestruct || true
        this.intervalId = setInterval((): void => {
            if (this.stopwatch.getDuration() > this.countdownMs) {
                this.stop()
                this.callback()

                autoDestroy && this.destruct()
            } else {
                this.setInterval()
            }
        }, leastRemainingCountdown)
    }

    /**
     * Clears interval.
     * @private
     */
    private clearInterval(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = undefined
        }
    }
}