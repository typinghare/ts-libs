import { Clock } from './Clock'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { Player, PlayerSettings } from './Player'

/**
 * Clock controller.
 * @author James Chan
 */
export abstract class ClockController<P extends Player<S>, S extends PlayerSettings = any> {
    /**
     * Player.
     * @protected
     */
    protected readonly _player: P

    /**
     * Clock.
     * @protected
     */
    protected readonly _clock: Clock

    /**
     * Resumes the clock if the clock is not running.
     */
    resumeClock() {
        if (!this._clock.isRunning()) {
            this._clock.resume()
        }
    }

    /**
     * Pauses the clock if the clock is running.
     */
    pauseClock(): void {
        if (this._clock.isRunning()) {
            this._clock.pause()
        }
    }

    /**
     * Returns the time of the clock.
     */
    get clockTime(): HourMinuteSecond {
        return this._clock.time
    }

    /**
     * Creates a clock controller.
     * @param player
     */
    protected constructor(player: P) {
        this._player = player
        this._clock = this.initializeClock()
    }

    /**
     * Initializes a clock.
     * @protected
     */
    protected abstract initializeClock(): Clock;
}