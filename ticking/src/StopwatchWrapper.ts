import { Stopwatch } from './Stopwatch'
import { Destructible } from './Destructible'

export class StopwatchWrapper implements Destructible {
    /**
     * The inner stopwatch.
     * @private
     */
    protected stopwatch: Stopwatch = new Stopwatch()

    /**
     * Returns the inner stopwatch.
     */
    public getStopwatch(): Stopwatch {
        return this.stopwatch
    }

    /**
     * Sets a new stopwatch.
     * @param stopwatch
     */
    public setStopWatch(stopwatch: Stopwatch): void {
        this.stop()
        this.stopwatch = stopwatch
    }

    /**
     * Resets the stopwatch; sets a brand-new stopwatch, where duration is 0.
     */
    public resetStopwatch(): void {
        this.setStopWatch(new Stopwatch())
    }

    /**
     * Stops the inner stopwatch.
     * @override
     */
    public destruct(): void {
        this.stop()
    }

    /**
     * Starts the inner stopwatch.
     */
    public start(): void {
        this.stopwatch.start()
    }

    /**
     * Pauses the inner stopwatch.
     */
    public pause(): void {
        this.stopwatch.pause()
    }

    /**
     * Resumes the inner stopwatch.
     */
    public resume(): void {
        this.stopwatch.resume()
    }

    /**
     * Stops the inner stopwatch.
     */
    public stop(): void {
        this.stopwatch.stop()
    }
}