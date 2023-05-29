import { GameClockSimulator } from '../tool/GameSimulator'
import { ChessGame } from '../game/chess/ChessGame'
import { ChessStandardPlayer, ChessStandardTimeControl } from '../game/chess/ChessStandard'

new GameClockSimulator(new ChessGame(ChessStandardTimeControl, ChessStandardPlayer)).start()