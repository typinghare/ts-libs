import { TickingState } from './TickingState'
import { Cloneable } from './Cloneable'
import { timestamp } from './utils'

export class Stopwatch implements Cloneable {
    /**
     * The state to this stopwatch.
     * @private
     */
    private state: TickingState = TickingState.NOT_STARTED

    /**
     * The timestamp of the start of the stopwatch.
     * @private
     */
    private startTimestamp: number = 0

    /**
     * The timestamp of the most recent pause.
     * @private
     */
    private resumedTimestamp: number = 0

    /**
     * The timestamp of the stop of the stopwatch.
     * @private
     */
    private stopTimestamp: number = 0

    /**
     * The duration.
     * @private
     */
    private duration: number = 0

    /**
     * Creates a ticking stopwatch.
     */
    public constructor() {
    }

    /**
     * Checks whether the current state equals to the given state.
     * @param state The state to check.
     */
    public is(state: TickingState): boolean {
        return state === this.state
    }

    /**
     * Starts this stopwatch.
     */
    public start(): void {
        if (this.state != TickingState.NOT_STARTED) {
            return
        }

        this.resumedTimestamp = this.startTimestamp = timestamp()
        this.state = TickingState.ONGOING
    }

    /**
     * Pauses this stopwatch.
     */
    public pause(): void {
        if (this.state != TickingState.ONGOING) {
            return
        }

        this.duration += timestamp() - this.resumedTimestamp
        this.state = TickingState.PAUSED
    }

    /**
     * Resumes this stopwatch.
     */
    public resume(): void {
        if (this.state != TickingState.PAUSED) {
            return
        }

        this.state = TickingState.ONGOING
        this.resumedTimestamp = timestamp()
    }

    /**
     * Stops this stopwatch.
     */
    public stop(): void {
        if (this.state == TickingState.STOPPED) {
            return
        }

        this.state = TickingState.STOPPED
        this.stopTimestamp = timestamp()
        this.duration += this.stopTimestamp - this.resumedTimestamp
    }

    /**
     * Returns the timestamp of the start of the stopwatch.
     */
    public getStartTimestamp(): number {
        return this.startTimestamp
    }

    /**
     * Returns the timestamp of the stop of the stopwatch.
     */
    public getStopTimestamp(): number {
        return this.stopTimestamp
    }

    /**
     * Returns the duration.
     */
    public getDuration(): number {
        switch (this.state) {
            case TickingState.NOT_STARTED:
                return 0
            case TickingState.PAUSED:
            case TickingState.STOPPED:
                return this.duration
            case TickingState.ONGOING:
                return this.duration + (timestamp() - this.resumedTimestamp)
        }
    }

    public clone(): this {
        const newObject = new Stopwatch()
        newObject.state = this.state
        newObject.startTimestamp = this.startTimestamp
        newObject.resumedTimestamp = this.resumedTimestamp
        newObject.stopTimestamp = this.stopTimestamp

        return newObject as this
    }
}