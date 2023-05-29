import { GameClockSimulator } from '../tool/GameSimulator'
import { ChessGame } from '../game/chess/ChessGame'
import { ChessStandardPlayer, ChessStandardTimeControl } from '../game/chess/ChessStandard'
import { SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

const chessGame = new ChessGame(ChessStandardTimeControl, ChessStandardPlayer)

for (const role of chessGame.roleArray) {
    const player = chessGame.getPlayer(role)
    const settings = player.timeControl.settings
    settings.getSetting('main').value = SlowHourMinuteSecond.ofSeconds(20)
    settings.getSetting('timeIncrement').value = SlowHourMinuteSecond.ofSeconds(5)
}

new GameClockSimulator(chessGame).start()