import { BoardGameTester } from '@typinghare/board-game-clock-core'
import { GoBoardGame } from '../go/GoBoardGame'
import { GoByoyomiPlayer } from '../go/byoyomi/GoByoyomiPlayer'

new BoardGameTester(new GoBoardGame(GoByoyomiPlayer)).start()