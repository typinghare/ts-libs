import { SettingContainer } from '../src/SettingContainer'

describe('Test Setting Container.', function(): void {
    it('Test setting container implementation.', function(): void {
        type SimpleSettings = {
            name: string
            age: number
        };

        class SimpleSettingContainer extends SettingContainer<SimpleSettings> {
        }

        const simpleSettingContainer = new SimpleSettingContainer()
        simpleSettingContainer.addSetting('name', 'defaultName')
        simpleSettingContainer.addSetting('age', 20)

        expect(simpleSettingContainer.getSetting('name').value).toBe('defaultName')
        expect(simpleSettingContainer.getSetting('age').value).toBe(20)
    })

    it('Test setting container properties.', function(): void {
        type SimpleSettings = {
            name: string
            age: number
        };

        type SimpleSettingProperties = {
            label: string,
            type: 'text' | 'number'
        }

        class SimpleSettingContainer extends SettingContainer<SimpleSettings, SimpleSettingProperties> {
        }

        const simpleSettingContainer = new SimpleSettingContainer()
        simpleSettingContainer.addSetting('name', 'defaultName', {
            label: 'Name',
            type: 'text',
        })
        simpleSettingContainer.addSetting('age', 20, {
            label: 'Age',
            type: 'number',
        })

        expect(simpleSettingContainer.getSetting('name').getProperty('label')).toBe('Name')
        expect(simpleSettingContainer.getSetting('age').getProperty('type')).toBe('number')
    })

    it('Test get properties.', function(): void {
        type SimpleSettings = {
            name: string
            age: number
        };

        class SimpleSettingContainer extends SettingContainer<SimpleSettings> {
        }

        const simpleSettingContainer = new SimpleSettingContainer()
        simpleSettingContainer.addSetting('name', 'defaultName')
        simpleSettingContainer.addSetting('age', 20)

        const settings = simpleSettingContainer.getSettings()
        for (const [name, setting] of Object.entries(settings)) {
            if (name === 'name') {
                expect(setting.value).toBe('defaultName')
            }
            if (name === 'age') {
                expect(setting.value).toBe(20)
            }
        }
    })
})