import { ChessStandardClockController } from './ChessStandardClockController'
import { BoardGameSetting, Player } from '@typinghare/board-game-clock-core'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

export type StandardPlayerSettings = {
    // The main time in seconds.
    main: HourMinuteSecond,

    // The time increment in seconds.
    timeIncrement: HourMinuteSecond
}

/**
 * Standard time control.
 */
export class ChessStandardPlayer extends Player<StandardPlayerSettings> {
    initialize(): void {
        this.addSetting('main', new BoardGameSetting(SlowHourMinuteSecond.ofMinutes(30), {
            type: 'time',
            label: 'Main Time',
            description: 'The initial allotted time a player has to make their moves in a chess game without any ' +
                'additional time added after each move. It is the baseline time available for a player to consider ' +
                'their moves.',
            options: [
                SlowHourMinuteSecond.ofMinutes(30),
                SlowHourMinuteSecond.ofMinutes(60),
                SlowHourMinuteSecond.ofMinutes(90),
            ],
        }))

        this.addSetting('timeIncrement', new BoardGameSetting(SlowHourMinuteSecond.ofSeconds(20), {
            type: 'time',
            label: 'Time Increment',
            description: 'An additional amount of time added to a player\'s clock after each move. It provides a ' +
                'small increase in the available time for a player to make their moves, helping to prevent time ' +
                'pressure as each move grants a time boost.',
            options: [
                SlowHourMinuteSecond.ofSeconds(20),
                SlowHourMinuteSecond.ofSeconds(30),
                SlowHourMinuteSecond.ofSeconds(40),
            ],
        }))
    }

    initializeClockController(): void {
        this._clockController = new ChessStandardClockController(this)
    }
}