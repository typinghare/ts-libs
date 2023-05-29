import { SettingContainer } from '@typinghare/settings'
import { GameSettingProperties, TimeControlSettings } from './types'

export abstract class TimeControl<
    TS extends TimeControlSettings
> {
    /**
     * Time control settings.
     * @private
     */
    protected readonly _settings = new SettingContainer<TS, GameSettingProperties>()

    /**
     * Returns this time control's settings.
     */
    get settings(): SettingContainer<TS, GameSettingProperties> {
        return this._settings
    }

    /**
     * Creates a time control.
     * @protected
     */
    public constructor() {
        this.initializeSettings()
    }

    /**
     * Initializes settings for this time control.
     * @protected
     */
    protected initializeSettings(): void {
    }
}