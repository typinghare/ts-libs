import { Builtins } from '../src/Builtins'
import { TimePlugin } from '../src/plugins/time/TimePlugin'

describe('', () => {
    it('Base Test', () => {
        Builtins.PLUGIN_MANAGER.register(new TimePlugin())

        Builtins.ITEM_MANAGER.register('token', '123456')
        const item = Builtins.ITEM_MANAGER.getById(1)
        console.log(item)
    })
})