import { RoverStatus } from '../src/interfaces'
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
    test('Moving a single rover in a straight line within the limit of the plateau', () => {
        const expectedResult : RoverStatus = {
            roverPositions: ['0 5 N'],
            message: 'Instructions complete. ', 
            instructionsComplete: true
        }
        expect(executeRoverInstructions(0, ['0 0 N'],'MMMMM', 5, 5)).toEqual(expectedResult)
    })
    test('Trying to move a single rover in a straight line beyond the limit of the plateau', () => {
        const expectedResult : RoverStatus = {
            roverPositions: ['1 3 N'],
            message: 'Reached the limit of the plateau. Stopping the execution of the instructions. ', 
            instructionsComplete: false
        }
        expect(executeRoverInstructions(0, ['1 3 N'],'MMMMMMM', 5, 5)).toEqual(expectedResult)
    })
    test('Moving a single rover in a L-shape', () => {
        const expectedResult : RoverStatus = {
            roverPositions: ['4 1 E'],
            message: 'Instructions complete. ', 
            instructionsComplete: true
        }
        expect(executeRoverInstructions(0, ['1 5 N'],'RRMMMMLMMM', 10, 20)).toEqual(expectedResult)
    })
    test('One rover but no instructions - staying still', () => {
        const expectedResult : RoverStatus = {
            roverPositions: ['3 17 W'],
            message: 'Instructions complete. ', 
            instructionsComplete: true
        }
        expect(executeRoverInstructions(0, ['3 17 W'],'', 30, 40)).toEqual(expectedResult)
    })
    test('Moving the 2nd rover out of a squad of 3', () => {
        const expectedResult : RoverStatus = {
            roverPositions: ['2 10 W', '1 15 S', '13 14 E'],
            message: 'Instructions complete. ',
            instructionsComplete: true
        }
        expect(executeRoverInstructions(1, ['2 10 W', '1 17 N', '13 14 E'],'LLMM', 20, 20)).toEqual(expectedResult)
    })
    test('Moving a rover to collide with another', () => {
        const expectedResult : RoverStatus = {
            roverPositions: ['3 17 W', '1 17 S'],
            message: 'Another rover is in the way. Stopping the execution of the instructions. ',
            instructionsComplete: false
        }
        expect(executeRoverInstructions(0, ['3 17 W', '1 17 S'],'MMM', 30, 40)).toEqual(expectedResult)
    })
})