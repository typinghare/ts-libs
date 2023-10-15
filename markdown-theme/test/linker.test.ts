import { Configuration, Linker } from '../src'

describe('Test linker', () => {
    it('Normal Link', () => {
        const configuration = new Configuration()
        configuration.getDatum('outDir').value
            = '/Users/jameschan/Library/Application Support/abnerworks.Typora/themes'
        configuration.getDatum('env').value = 'typora'

        const linker = new Linker(configuration)

        linker.run()
    })
})