import { GoBoardGame } from '../go/GoBoardGame'
import { GoByoyomiPlayer } from '../go/byoyomi/GoByoyomiPlayer'
import { BoardGameTester } from '@typinghare/board-game-clock-core'


new BoardGameTester(new GoBoardGame(GoByoyomiPlayer)).start()