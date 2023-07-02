import { DefaultSettingProperties, Setting } from '../src/Setting'

describe('Setting extension.', function() {
    interface GeneralSettingProperties<T> extends DefaultSettingProperties<T> {
        label: string
        description: string,
    }

    class GeneralSetting<T> extends Setting<T, GeneralSettingProperties<T>> {
    }

    it('Test properties.', function() {
        const label = 'label of setting'
        const description = 'Description of setting.'
        const generalSetting = new GeneralSetting(5, { label, description })

        expect(generalSetting.getProperty('label')).toBe(label)
        expect(generalSetting.getProperty('description')).toBe(description)

        const newLabel = 'New Label'
        generalSetting.setProperty('label', newLabel)
        expect(generalSetting.getProperty('label')).toBe(newLabel)
    })

    it('Test beforeSet callback.', function() {
        const label = 'label of setting'
        const description = 'Description of setting.'

        let isCallbackFired = false
        const generalSetting = new GeneralSetting<string>('Initial value', { label, description })
        generalSetting.setProperty('beforeSet', (newValue: string) => {
            isCallbackFired = true
            return 'Edited: ' + newValue
        })

        generalSetting.value = 'New value'

        expect(isCallbackFired).toBe(true)
        expect(generalSetting.value).toBe('Edited: New value')
    })
})