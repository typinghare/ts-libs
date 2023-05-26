import { BoardGame } from '../BoardGame'
import { HourMinuteSecond } from '@typinghare/hour-minute-second'
import { Player } from '../Player'
import { DefaultBoardGame } from '../default/DefaultBoardGame'
import { Role } from '../Role'

const keypress = require('keypress')

type AnyBoardGame = BoardGame<any, any>

/**
 * @author James Chan
 */
export class BoardGameTester {
    private readonly _boardGame: AnyBoardGame

    private readonly _refreshRate: number

    constructor(boardGame: AnyBoardGame, refreshRate: number = 20) {
        this._boardGame = boardGame
        this._refreshRate = refreshRate
    }

    start(): void {
        const roleArray = this._boardGame.getRoleArray()
        const roleStringArray = roleArray.map(role => role.toString())
        const playerArray: Player<any>[] = []
        roleArray.forEach(role => playerArray.push(this._boardGame.getPlayer(role)))

        const gameClassName: string = Object.getPrototypeOf(this._boardGame).constructor.name
        const playerClassName: string = Object.getPrototypeOf(playerArray[0]).constructor.name
        console.log(`Initializing board game (${gameClassName}<${playerClassName}>)...`)

        // Prints all roles.
        console.log(`There are ${roleArray.length} roles in the board game: [${roleArray.join(', ')}].`)

        // Starts the game.
        this._boardGame.start()
        console.log('Board game has started. You can mock players\' clicking by pressing corresponding number keys.')
        console.log()

        const startedTime = new Date().getTime()

        function getDisplayString(): string {
            const playerClockStringArray: string[] = []
            for (let i = 0; i < roleArray.length; i++) {
                const player = playerArray[i]
                playerClockStringArray[i]
                    = roleStringArray[i] + `(${i + 1}): ` + player.clockController.clockTime.toString()

                // Appends extra properties.
                const extraProperties: Record<string, any> | undefined = player.getExtraProperties()
                if (extraProperties !== undefined && Object.keys(extraProperties).length > 0) {
                    const extraItemArray: string[] = []
                    for (const [key, value] of Object.entries(extraProperties)) {
                        extraItemArray.push(`${key}: ${value}`)
                    }

                    playerClockStringArray[i] += ` (${extraItemArray.join(', ')})`
                }
            }

            const runTime: number
                = Math.floor((new Date().getTime() - startedTime) / HourMinuteSecond.MILLISECONDS_IN_SECOND)
            return playerClockStringArray.join('\n') + '\n' + `(${runTime} seconds has run)`

        }

        // Refreshes players' time.
        let firstTime = false
        const intervalHandle = setInterval((): void => {
            process.stdin.pause()
            if (!firstTime) {
                firstTime = true
            } else {
                process.stdout.cursorTo(0)
                for (let i = 0; i < playerArray.length; i++) {
                    process.stdout.moveCursor(0, -1)
                    process.stdout.clearLine(0)
                }
            }
            process.stdout.write(getDisplayString())
            process.stdin.resume()
        }, Math.round(HourMinuteSecond.MILLISECONDS_IN_SECOND / this._refreshRate))

        // Stops interval when the game stops.
        this._boardGame.clockTimeUpCallback = (timeUpRole) => {
            clearInterval(intervalHandle)
            this.boardGameEnd(timeUpRole)
        }

        // Initialize keypress.
        this.initializeKeypress(playerArray)
    }

    private boardGameEnd(timeUpRole: Role): void {
        process.stdin.pause()
        console.log()
        console.log(`The board game has been stopped because Player ${timeUpRole.toString()} has run out of time.`)
    }

    private initializeKeypress(playerArray: Player<any>[]): void {
        keypress(process.stdin)
        process.stdin.on('keypress', function(ch, key) {
            const num: number = parseInt(ch)
            if (!isNaN(num)) {
                playerArray[num - 1].onClick()
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
}

new BoardGameTester(new DefaultBoardGame()).start()