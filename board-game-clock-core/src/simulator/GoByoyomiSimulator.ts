import { GoGame, GoGameSupplierMap } from '../game/go/GoGame'
import { GoByoyomiPlayer, GoByoyomiTimeControl } from '../game/go/GoByoyomi'
import { SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { GameClockSimulator } from '../tool/GameSimulator'

const goGame = GoGameSupplierMap.Byoyomi() as GoGame<GoByoyomiTimeControl, GoByoyomiPlayer>

for (const role of goGame.roleArray) {
    const player = goGame.getPlayer(role)
    const settings = player.timeControl.settings
    settings.getSetting('main').value = SlowHourMinuteSecond.ofSeconds(15)
    settings.getSetting('timePerPeriod').value = SlowHourMinuteSecond.ofSeconds(10)
    settings.getSetting('periods').value = 3
}

new GameClockSimulator(goGame).start()