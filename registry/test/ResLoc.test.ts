import { ResLoc } from '../src'
import { RegistryBuiltin } from '../src/RegistryBuiltin'
import { RegistryUtil } from '../src/RegistryUtil'

describe('ResLoc tests', () => {
    it('Create instance directly', () => {
        const loc = new ResLoc('Minecraft', 'iron_ingot')
        expect(loc.getNamespace()).toEqual('Minecraft')
        expect(loc.getPath()).toEqual('iron_ingot')
    })

    it('Create instance with builtin builder', () => {
        const loc = RegistryBuiltin.RES_LOC_BUILDER.create('sapphire')
        expect(loc.getNamespace()).toEqual(RegistryBuiltin.NAMESPACE)
        expect(loc.getPath()).toEqual('sapphire')
    })

    it('Create instance with helper function', () => {
        const loc = RegistryUtil.createLoc('sapphire')
        expect(loc.getNamespace()).toEqual(RegistryBuiltin.NAMESPACE)
        expect(loc.getPath()).toEqual('sapphire')
    })
})