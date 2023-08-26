import { commandsParser } from '../src/commandsParser'
import { roversCommands } from '../src/interfaces'

describe("Testing that input can be parsed correctly into a command object", () =>{
    test("Success: breaking input into the right command object - 1 rover", () => {
        const input = "25 24 \n 18 13 N \n MMR"
        const expectedResult: roversCommands = {
            upperRightCoordinates: "25 24",
            roverPositions: ['18 13 N'],
            roverInstructions: ['MMR']
        }
        expect(commandsParser(input)).toEqual(expectedResult)
    })

    test("Success: breaking input into the right command object - 3 rovers", () => {
        const input = "5 5 \n 1 2 N \n MM \n 3 3 E \n LL \n 4 2 W \n MMMLLRR"
        const expectedResult: roversCommands = {
            upperRightCoordinates: "5 5",
            roverPositions: ['1 2 N', '3 3 E', '4 2 W'],
            roverInstructions: ['MM', 'LL', 'MMMLLRR']
        }
        expect(commandsParser(input)).toEqual(expectedResult)
    })
})