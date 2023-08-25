import { move } from '../src/roversMotions'

describe("Testing that move instuctions (M) are correctly executed", () => {
    test("Moving northward", () => {
        expect(move('1 1 N')).toBe('1 2 N')
    })

    test("Moving southward", () => {
        expect(move('10 20 S')).toBe('10 19 S')
    })

    test("Moving eastward", () => {
        expect(move('5 4 E')).toBe('6 4 E')
    })

    test("Moving westward", () => {
        expect(move('101 100 W')).toBe('100 100 W')
    })
})