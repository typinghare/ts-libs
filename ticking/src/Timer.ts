import { StopwatchWrapper } from './StopwatchWrapper'
import { Callback } from './types'

export interface TimerOptions {
    autoDestroy?: boolean
}

export class Timer extends StopwatchWrapper {
    /**
     * The ID of the interval.
     * @private
     */
    private intervalId: any

    /**
     * Creates a timer.
     */
    public constructor(
        private readonly duration: number,
        private readonly callback: Callback<Timer>,
        private readonly options ?: TimerOptions,
    ) {
        super()
        this.setInterval()
    }

    public override destroy(): void {
        this.clearInterval()
        super.destroy()
    }

    /**
     * Sets up interval.
     * @private
     */
    private setInterval(): void {
        this.clearInterval()

        const currentDuration: number = this.stopwatch.getDuration()
        const leastRemainingTime: number = this.duration - currentDuration
        this.intervalId = setInterval((): void => {
            const duration = this.stopwatch.getDuration()
            if (duration > this.duration) {
                this.callback()
                const autoDestroy = this.options?.autoDestroy || true
                if (autoDestroy) {
                    this.destroy()
                }
            } else {
                this.setInterval()
            }
        }, leastRemainingTime)
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