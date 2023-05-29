import { TimeControl } from '../../TimeControl'
import { Player } from '../../Player'
import { PlayerAttributeProperties, PlayerAttributes, TimeControlSettings } from '../../types'
import { TwoPlayerGame } from '../../stereotype/TwoPlayerGame'

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