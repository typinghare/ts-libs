import { DefaultBoardGame } from '../game/default/DefaultBoardGame'

const defaultBoardGame = new DefaultBoardGame()
const [roleA, roleB] = defaultBoardGame.getRoleArray()
const playerA = defaultBoardGame.getPlayer(roleA)
const playerB = defaultBoardGame.getPlayer(roleB)

defaultBoardGame.start()

setInterval(() => {
    const time = playerA.clockController.clockTime
    console.log(time.toString())
}, 1000)

playerB.onClick()