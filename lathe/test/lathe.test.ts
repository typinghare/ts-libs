import { FinishingLathe } from '../src'

describe('Test Lathe class.', (): void => {
    it('Arithmetic lathe.', (): void => {
        class ArithmeticLathe extends FinishingLathe<number> {
        }

        const arithmeticLathe = new ArithmeticLathe()
        arithmeticLathe.addIntermediateDrawings(num => num * 3 + 1)
        arithmeticLathe.addIntermediateDrawings(num => num / 2)

        const result = arithmeticLathe.process(5)
        expect(result).toEqual(8)
    })
})