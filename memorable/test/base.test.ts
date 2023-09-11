import { Builtins } from '../src/Builtins'

describe('', () => {
    it('Base Test', () => {
        Builtins.ITEM_MANAGER.register('token', '123456')
        const item = Builtins.ITEM_MANAGER.getById(1)
        console.log(item)
    })
})