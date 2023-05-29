import { AnyGame, Role } from '../types'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { Player } from '../Player'

const keypress = require('keypress')

/**
 * A terminal-based board game clock simulator.
 * @author James Chan
 */
export class GameClockSimulator {
    /**
     * Default refresh rate.
     * @private
     */
    private static DEFAULT_REFRESH_RATE: number = 1

    /**
     * The game.
     * @private
     */
    private readonly _game: AnyGame

    /**
     * The refresh rate per second.
     * @private
     */
    private readonly _refreshRate: number

    /**
     * Creates a game simulator.
     * @param game - Game.
     * @param refreshRate - Refresh rate.
     */
    constructor(game: AnyGame, refreshRate: number = GameClockSimulator.DEFAULT_REFRESH_RATE) {
        this._game = game
        this._refreshRate = refreshRate
    }

    start(): void {
        const roleArray = this._game.roleArray

        const firstPlayer: Player = this._game.getPlayer(roleArray[0])
        const gameClassName: string = this.getClassName(this._game)
        const timeControlClassName: string = this.getClassName(firstPlayer.timeControl)
        const playerClassName: string = this.getClassName(firstPlayer)
        this.print(`Initializing board game (${gameClassName}<${timeControlClassName}, ${playerClassName}>)...`)

        // Prints all roles.
        this.print(`There are ${roleArray.length} roles in the board game: [${roleArray.join(', ')}].`)

        // Starts the game.
        this._game.start()
        this.print('Board game has started. You can mock players\' clicking by pressing corresponding number keys.\n')

        const startTimestamp = new Date().getTime()
        let firstTime = false
        const intervalHandle = setInterval((): void => {
            if (!firstTime) {
                firstTime = true
            } else {
                process.stdout.cursorTo(0)
                for (let i = 0; i < roleArray.length + 2; i++) {
                    process.stdout.moveCursor(0, -1)
                    process.stdout.clearLine(0)
                }
            }

            // Print players.
            process.stdout.write(this.getPlayerString(roleArray))

            // Print time run.
            const runTime: number
                = Math.floor((new Date().getTime() - startTimestamp) / HourMinuteSecond.MILLISECONDS_IN_SECOND)
            this.print('\n' + `(${runTime} seconds has run)`)
        }, Math.round(HourMinuteSecond.MILLISECONDS_IN_SECOND / this._refreshRate))

        // Stops interval when the game stops.
        this._game.clockTimeUpCallback = (timeUpRole): void => {
            clearInterval(intervalHandle)
            this._game.stop()

            this.print(`\nThe board game has been stopped because Player ${timeUpRole.toString()} has run out of time.`)
            process.exit(0)
        }

        // Initialize keypress.
        this.initializeKeypress(roleArray)
    }

    private print(content: string): void {
        process.stdin.pause()
        console.log(content)
        process.stdin.resume()
    }

    private getPlayerString(roleArray: Role[]): string {
        const clockStringArray: string[] = []
        for (let i = 0; i < roleArray.length; i++) {
            const role: Role = roleArray[i]
            const player = this._game.getPlayer(role)
            clockStringArray[i] = role + `(${i + 1}): ` + player.clockController.clockTime.toString()

            // Appends extra properties.
            const playerAttributes = player.attributes.getSettings()
            if (Object.keys(playerAttributes).length > 0) {
                const attributeStringArray: string[] = []
                for (const attribute of Object.values(playerAttributes)) {
                    attributeStringArray.push(`${attribute.getProperty('label')}: ${attribute.value}`)
                }

                clockStringArray[i] += ` (${attributeStringArray.join(', ')})`
            }
        }

        return clockStringArray.join('\n') + '\n'
    }

    private initializeKeypress(roleArray: Role[]): void {
        keypress(process.stdin)

        process.stdin.on('keypress', (ch, key): void => {
            const num: number = parseInt(ch)
            if (!isNaN(num) && num >= 1 && num <= roleArray.length) {
                const role = roleArray[num - 1]
                this._game.getPlayer(role).click()
            }

            // Ctrl-C exits program.
            if (key && key.ctrl && key.name == 'c') {
                process.stdin.pause()
                process.exit(0)
            }
        })

        process.stdin.setRawMode(true)
        process.stdin.resume()
    }

    private getClassName(object: object): string {
        return Object.getPrototypeOf(object).constructor.name
    }
}