import { RegistryUtil } from '../src'

describe('Registry tests', () => {
    it('Basic tests', () => {
        // Create a registry that accepts string resources
        const registry = RegistryUtil.createRegistry<string>('gem')

        // Create resource locations
        const locEnglishHelloWorld = RegistryUtil.createLoc('english_hello_world')
        const locChineseHelloWorld = RegistryUtil.createLoc('chinese_hello_world')

        // Register resources
        registry.register(locEnglishHelloWorld, 'Hello, world!')
        registry.register(locChineseHelloWorld, '你好，世界!')

        // Retrieve resources by their locations
        const englishHelloWorld = registry.getByLoc(locEnglishHelloWorld)
        const chineseHelloWorld = registry.getByLoc(locChineseHelloWorld)

        expect(englishHelloWorld).toBe('Hello, world!')
        expect(chineseHelloWorld).toBe('你好，世界!')

        // Test references
        const refChineseHelloWorld = registry.getRef(locChineseHelloWorld)
        expect(refChineseHelloWorld.getId()).toBe(1)
    })
})