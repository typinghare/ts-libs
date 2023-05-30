import { TimeControl } from '../../TimeControl'
import { Player } from '../../Player'
import {
    GameSupplierMap,
    GameTimeControl,
    PlayerAttributeProperties,
    PlayerAttributes,
    TimeControlSettings,
} from '../../types'
import { TwoPlayerGame } from '../../stereotype/TwoPlayerGame'
import { ChessStandardPlayer, ChessStandardTimeControl } from './ChessStandard'

export type ChessGameSettings = {
    sync: boolean
}

export class ChessGame<
    T extends TimeControl<TS>,
    P extends Player<T, TS, PA, PP>,
    TS extends TimeControlSettings = any,
    PA extends PlayerAttributes = any,
    PP extends PlayerAttributeProperties = any,
> extends TwoPlayerGame<ChessGameSettings, T, P, TS, PA, PP> {
    public override initializeSettings(): void {
        this.settings.addSetting('sync', true, {
            type: 'bool',
            label: 'Sync',
            description: 'This is a description.',
        })
    }
}

export type ChessGameTimeControlType = 'Standard'
export const ChessGameTimeControl: GameTimeControl<ChessGameTimeControlType> = ['Standard']

export const ChessGameSupplierMap: GameSupplierMap<ChessGameTimeControlType> = {
    Standard: () => new ChessGame(ChessStandardTimeControl, ChessStandardPlayer),
}