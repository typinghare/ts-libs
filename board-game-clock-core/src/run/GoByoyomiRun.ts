import { GoBoardGame } from '../game/go/GoBoardGame'
import { GoByoyomiPlayer } from '../game/go/byoyomi/GoByoyomiPlayer'

const goGame = new GoBoardGame(GoByoyomiPlayer)
const [roleA, roleB] = goGame.getRoleArray()
const playerA = goGame.getPlayer(roleA)
const playerB = goGame.getPlayer(roleB)

goGame.start()

setInterval(() => {
    const time = playerA.clockController.clockTime
    console.log(time.toString())
}, 1000)

playerB.onClick()