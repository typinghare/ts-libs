import { ResKey } from '../src'
import { RegistryBuiltin } from '../src/RegistryBuiltin'
import { RegistryUtil } from '../src/RegistryUtil'

describe('ResKey tests', () => {
    it('Create ResKey directly', () => {
        const parent = RegistryBuiltin.RES_LOC_BUILDER.create('gem')
        const loc = RegistryBuiltin.RES_LOC_BUILDER.create('sapphire')
        const resKey = new ResKey(parent, loc)

        expect(resKey.getParent()).toBe(parent)
        expect(resKey.getLoc()).toBe(loc)
        expect(resKey.toString()).toBe('Builtin:sapphire@Builtin:gem')
    })

    it('Create registry key with helper function', () => {
        const registryKey = RegistryUtil.createRegistryKey('gem')

        expect(registryKey.getLoc().toString()).toBe('Builtin:gem')
    })

})