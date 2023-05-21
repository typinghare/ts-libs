import { SettingContainer } from '../src/SettingContainer'
import { AbstractSetting } from '../src/AbstractSetting'
import { Setting } from '../src/Setting'
import { SettingMap } from '../src/types'

describe('Test Setting Container.', function() {
    it('Test setting container implementation.', function() {
        type SimpleSetting = {
            name: string;
            age: number;
        };

        class SimpleSettingContainer implements SettingContainer<SimpleSetting> {
            private _simpleSetting: SettingMap<SimpleSetting> = {} as SettingMap<SimpleSetting>

            addSetting<K extends keyof SimpleSetting>(name: K, setting: AbstractSetting<SimpleSetting[K]>): void {
                // @ts-ignore
                this._simpleSetting[name] = setting as AbstractSetting<SimpleSetting[K]>
            }

            getSetting<K extends keyof SimpleSetting>(name: K): AbstractSetting<SimpleSetting[K]> {
                return this._simpleSetting[name]
            }

            getSettingValue<K extends keyof SimpleSetting>(name: K): SimpleSetting[K] {
                return this.getSetting(name).value
            }

            getSettings(): Iterable<AbstractSetting<any>> {
                return Object.values(this._simpleSetting)
            }
        }

        const simpleSettingContainer = new SimpleSettingContainer()
        simpleSettingContainer.addSetting('name', new Setting<string>('defaultName'))
        simpleSettingContainer.addSetting('age', new Setting<number>(20))

        expect(simpleSettingContainer.getSettingValue('name')).toBe('defaultName')
        expect(simpleSettingContainer.getSettingValue('age')).toBe(20)
    })
})