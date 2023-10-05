import { Callback } from './types'
import { TickingState } from './TickingState'
import { StopwatchWrapper } from './StopwatchWrapper'

interface IntervalCallerOptions {
    // The interval of checking the inner stopwatch; if not set, the check interval will be the
    // given interval
    checkInterval?: number

    // Whether to fire the callback function if the stopwatch has been paused
    callIfPaused?: boolean

    // Whether to automatically destruct when the stopwatch has been stopped
    autoDestruct?: boolean
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

        const checkInterval: number = options.checkInterval || intervalMs
        const callIfPaused: boolean = options.callIfPaused || false
        const autoDestruct: boolean = options.autoDestruct || true
        this.intervalId = setInterval((): void => {
            const state: TickingState = this.getStopwatch().getState()
            if (state === TickingState.ONGOING) {
                this.check()
            } else if (state === TickingState.PAUSED && callIfPaused) {
                this.check()
            } else if (state === TickingState.STOPPED) {
                autoDestruct && this.destruct()
            }
        }, checkInterval)
    }

    /**
     * Fires the wrapped callback.
     */
    public fireCallback(): void {
        this.callback()
    }

    /**
     * Clear the interval and destruct itself.
     */
    public override destruct(): void {
        this.clearInterval()
        super.destruct()
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