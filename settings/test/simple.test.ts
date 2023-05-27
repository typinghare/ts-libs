import { Setting } from '../src/Setting'

describe('Test general setting.', function() {
    type SettingProperties = {
        label: string
        description: string,
    }

    class GeneralSetting<T> extends Setting<T, SettingProperties> {
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

    it('Test callback.', function() {
        const label = 'label of setting'
        const description = 'Description of setting.'

        let isCallbackInvoked = false
        const generalSetting = new GeneralSetting<string>('Init', { label, description })
        generalSetting.updateValueCallback = (newValue): string => {
            isCallbackInvoked = true
            return 'Edited: ' + newValue
        }

        generalSetting.value = 'Updated'

        expect(isCallbackInvoked).toBe(true)
        expect(generalSetting.value).toBe('Edited: Updated')
    })
})