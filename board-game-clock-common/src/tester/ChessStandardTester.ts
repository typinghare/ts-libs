import { BoardGameTester } from '@typinghare/board-game-clock-core'
import { ChessBoardGame } from '../chess/ChessBoardGame'
import { ChessStandardPlayer } from '../chess/standard/ChessStandardPlayer'

new BoardGameTester(new ChessBoardGame(ChessStandardPlayer)).start()