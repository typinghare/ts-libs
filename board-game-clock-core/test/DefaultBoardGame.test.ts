import { DefaultBoardGame } from '../src/game/default/DefaultBoardGame'

describe('Test default board game', function() {
    const defaultBoardGame = new DefaultBoardGame()
    const [roleA, roleB] = defaultBoardGame.getRoleArray()
    const playerA = defaultBoardGame.getPlayer(roleA)
    const playerB = defaultBoardGame.getPlayer(roleB)

    defaultBoardGame.start()

    it('Test', function() {
        const playerAClockController = playerA.clockController
        const playerBClockController = playerB.clockController

        console.log(playerA.clockController)
        console.log(playerB.clockController)

        expect(playerAClockController).not.toBeUndefined()
        expect(playerBClockController).not.toBeUndefined()
    })
})