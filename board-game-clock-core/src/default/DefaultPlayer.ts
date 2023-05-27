import { DefaultClockController } from './DefaultClockController'
import { Player, PlayerExtraPropertiesMap } from '../main'
import { PlayerExtraProperty, PlayerExtraPropertyProperties } from '../PlayerExtraProperty'
import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

export type DefaultPlayerExtraPropertyProperties = PlayerExtraPropertyProperties & {}

export type DefaultPlayerExtraProperties = {
    isRunning: boolean
}

export type DefaultPlayerSettings = {
    // The main time in seconds.
    main: HourMinuteSecond
}

/**
 * @author James Chan
 */
export class DefaultPlayer extends Player<DefaultPlayerSettings, DefaultPlayerExtraProperties, DefaultPlayerExtraPropertyProperties> {
    override initialize(): void {
        this.addSetting('main', SlowHourMinuteSecond.ofSeconds(15), {
            type: 'time',
            label: 'Main Time',
            description: 'The main time.',
        })
    }

    override initializeClockController(): void {
        this._clockController = new DefaultClockController(this)
    }

    override getExtraProperties(): PlayerExtraPropertiesMap<DefaultPlayerExtraProperties, PlayerExtraPropertyProperties> {
        const extraProperty
            = new PlayerExtraProperty<boolean, DefaultPlayerExtraPropertyProperties>(this.clockController.isClockRunning())
        extraProperty.setProperty('label', 'Running')

        return { 'isRunning': extraProperty }
    }
}