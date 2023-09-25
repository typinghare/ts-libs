import { Stopwatch } from './Stopwatch'
import { Destroyable } from './Destroyable'

export class StopwatchWrapper implements Destroyable{
    /**
     * The inner stopwatch.
     * @private
     */
    protected readonly stopwatch: Stopwatch = new Stopwatch()

    /**
     * Returns the inner stopwatch.
     */
    public getStopwatch(): Stopwatch {
        return this.stopwatch
    }

    /**
     * Stops the inner stopwatch.
     */
    public destroy(): void {
        this.stopwatch.stop()
    }
}