import { BoardGameTester } from '@typinghare/board-game-clock-core'
import { GoBoardGame } from '../go/GoBoardGame'
import { GoYingshiPlayer } from '../go/yingshi/GoYingshiPlayer'

new BoardGameTester(new GoBoardGame(GoYingshiPlayer)).start()