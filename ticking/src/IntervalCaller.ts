import { Callback } from './types'
import { TickingState } from './TickingState'
import { StopwatchWrapper } from './StopwatchWrapper'

interface IntervalCallerOptions {
    checkInterval?: number
    callIfPaused?: boolean
    autoDestroy?: boolean
}

export class IntervalCaller extends StopwatchWrapper {
    /**
     * The duration cutoff of the next callback calling.
     * @private
     */
    private nextCallDuration: number = 0

    /**
     * The ID of the interval.
     * @private
     */
    private intervalId: any

    /**
     * Creates an interval caller.
     * @param intervalMs The interval of firing the inner callback.
     * @param callback The inner callback to fire.
     * @param options The options
     */
    public constructor(
        private readonly intervalMs: number,
        private readonly callback: Callback<IntervalCaller>,
        options: IntervalCallerOptions = {},
    ) {
        super()
        this.nextCallDuration = intervalMs
        this.intervalId = setInterval((): void => {
            if (this.stopwatch.is(TickingState.ONGOING)) {
                this.check()
            } else if (this.stopwatch.is(TickingState.PAUSED) && options.callIfPaused) {
                this.check()
            } else if (this.stopwatch.is(TickingState.STOPPED)) {
                // Clear this interval if the stopwatch is stopped
                this.clearInterval()
                const autoDestroy = options.autoDestroy || true
                if (autoDestroy) {
                    this.destroy()
                }
            }
        }, options.checkInterval || intervalMs)
    }

    /**
     * Fires the wrapped callback.
     */
    public fireCallback(): void {
        this.callback()
    }

    public override destroy(): void {
        this.clearInterval()
        super.destroy()
    }

    /**
     * Updates the next call duration.
     * @private
     */
    private updateNextCallDuration(): void {
        this.nextCallDuration += this.intervalMs
    }

    /**
     * Checks the duration; fires the callback is the duration is greater than the next call
     * duration, and update the next call duration.
     * @private
     */
    private check(): void {
        const duration = this.stopwatch.getDuration()
        if (duration > this.nextCallDuration) {
            this.fireCallback()
            this.updateNextCallDuration()
        }
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