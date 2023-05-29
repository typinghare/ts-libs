import { GoGame } from '../game/go/GoGame'
import { SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { GameClockSimulator } from '../tool/GameSimulator'
import { GoYingshiPlayer, GoYingshiTimeControl } from '../game/go/GoYingshi'

const goGame = new GoGame(GoYingshiTimeControl, GoYingshiPlayer)

for (const role of goGame.roleArray) {
    const player = goGame.getPlayer(role)
    const settings = player.timeControl.settings
    settings.getSetting('main').value = SlowHourMinuteSecond.ofSeconds(15)
    settings.getSetting('penaltyTime').value = SlowHourMinuteSecond.ofSeconds(10)
    settings.getSetting('maxPenalties').value = 2
}

new GameClockSimulator(goGame).start()