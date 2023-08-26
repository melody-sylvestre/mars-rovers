import { finalRoverStatus } from '../src/interfaces'
import { move, rotate, executeRoverInstructions } from '../src/roversMotions'

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

describe("Testing that rotate instructions (L or R) are correctly executed", () => {
    test('Rotating Left from N', () => {
        expect(rotate('2 2 N', 'L')).toBe('2 2 W')
    })
    test('Rotating Left from W', () => {
        expect(rotate('45 34 W', 'L')).toBe('45 34 S')
    })
    test('Rotating Left from S', () => {
        expect(rotate('10 9 S', 'L')).toBe('10 9 E')
    })
    test('Rotating Left from E', () => {
        expect(rotate('5 6 E', 'L')).toBe('5 6 N')
    })
    test('Rotating Right from N', () => {
        expect(rotate('5 6 N', 'R')).toBe('5 6 E')
    })
    test('Rotating Right from E', () => {
        expect(rotate('12 6 E', 'R')).toBe('12 6 S')
    })
    test('Rotating Right from S', () => {
        expect(rotate('234 345 S', 'R')).toBe('234 345 W')
    })
    test('Rotating Right from W', () => {
        expect(rotate('2 3 W', 'R')).toBe('2 3 N')
    })       
})

describe('Checking that instructions to a rover can be correctly executed (executeRoversInstructions)', () => {
    test('Moving in a straight line within the limit of the plateau', () => {
        const expectedResult : finalRoverStatus = {
            roverPosition: '0 5 N',
            message: 'Instructions complete.', 
            instructionsComplete: true
        }
        expect(executeRoverInstructions('0 0 N','MMMMM', 5, 5)).toEqual(expectedResult)
    })

    test('Moving in a rectangle along the edges', () => {
        const expectedResult : finalRoverStatus = {
            roverPosition: '0 0 N',
            message: 'Instructions complete.', 
            instructionsComplete: true
        }
        expect(executeRoverInstructions('0 0 N','MMMMMRMMMRMMMMMRMMMR', 3, 5)).toEqual(expectedResult)
    })

    test('Moving in a L-shape', () => {
        const expectedResult : finalRoverStatus = {
            roverPosition: '4 1 E',
            message: 'Instructions complete.', 
            instructionsComplete: true
        }
        expect(executeRoverInstructions('1 5 N','RRMMMMLMMM', 10, 20)).toEqual(expectedResult)
    })

    test('No instructions - staying still', () => {
        const expectedResult : finalRoverStatus = {
            roverPosition: '3 17 W',
            message: 'Instructions complete.', 
            instructionsComplete: true
        }
        expect(executeRoverInstructions('3 17 W','', 30, 40)).toEqual(expectedResult)
    })

    test('Trying to move in a straight line beyond the limit of the plateau', () => {
        const expectedResult : finalRoverStatus = {
            roverPosition: '0 5 N',
            message: 'Reached the limit of the plateau. Stopping the execution of the instructions.', 
            instructionsComplete: false
        }
        expect(executeRoverInstructions('0 5 N','MMMMMMM', 5, 5)).toEqual(expectedResult)
    })
})