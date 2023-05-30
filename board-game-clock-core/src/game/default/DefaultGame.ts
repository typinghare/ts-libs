import { TimeControl } from '../../TimeControl'
import { Player } from '../../Player'
import { ClockController } from '../../ClockController'
import { Clock } from '../../Clock'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import { TwoPlayerGame } from '../../stereotype/TwoPlayerGame'
import { GameSettings } from '../../types'

export type DefaultGameSettings = GameSettings & {}

export type DefaultPlayerAttributes = {
    isRunning: boolean
}

export type DefaultTimeControlSettings = {
    main: HourMinuteSecond
}

export class DefaultGame extends TwoPlayerGame<DefaultGameSettings, DefaultTimeControl, DefaultPlayer> {
    constructor() {
        super(DefaultTimeControl, DefaultPlayer)
    }

    protected override initializeTimeControl(): void {
        this._timeControlMap['default'] = () => new DefaultGame()
    }
}

export class DefaultPlayer extends Player<DefaultTimeControl, DefaultTimeControlSettings, DefaultPlayerAttributes> {
    protected override createClockController(): DefaultClockController {
        return new DefaultClockController(this)
    }

    protected override updateAttributes(): void {
        this._attributes.addSetting('isRunning', this.clockController.isClockRunning(), { label: 'Running' })
    }
}

export class DefaultTimeControl extends TimeControl<DefaultTimeControlSettings> {
    protected override initializeSettings(): void {
        this.settings.addSetting('main', SlowHourMinuteSecond.ofSeconds(15))
    }
}

export class DefaultClockController extends ClockController<DefaultTimeControlSettings> {
    protected override initializeClock(): Clock {
        const settings = this._timeControl.settings
        const main: HourMinuteSecond = settings.getSetting('main').value

        return new Clock(main, (): HourMinuteSecond | undefined => {
            this._player.timeUp()
            return undefined
        })
    }
}