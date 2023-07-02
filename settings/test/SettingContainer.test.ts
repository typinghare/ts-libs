import { SettingContainer } from '../src/SettingContainer'

describe('Test setting container.', function() {
    const settingContainer = new SettingContainer<{
        id: number
    }>()

    // const idSetting = settingContainer.getSetting('id')
    // const beforeGetProperty = idSetting.getProperty('beforeSet')

    it('should ', function() {
        expect(1).toBe(1)
    })
})