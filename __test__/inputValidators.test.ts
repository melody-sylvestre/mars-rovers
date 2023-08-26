import { validateNumberOfCommandLines, 
        validateUpperRightCoordinates, 
        validateRoverPosition, 
        validateRoverInstructions } from '../src/inputValidators'

describe("Checking that an incorrect number of lines in the input can be detected (validateNumberOfCommandLines)", () => {
    test("Sucess: Valid number of lines in input (3)", () => {
        const input: string = "5 5\n1 2 N\nLMM"
        expect(validateNumberOfCommandLines(input)).toBe(true)
    })
    test("Success: Valid number of lines in input (7)", () => {
        const input: string = "5 5\n1 2 N\nLMM\n1 4 N\nLMM\n1 1 N\nLMM"
        expect(validateNumberOfCommandLines(input)).toBe(true)
    })
    test("Failure: Invalid number of lines in input (1)", () => {
        const input: string = "5 5"
        expect(validateNumberOfCommandLines(input)).toBe(false)
    })
    test("Failure: Empty input", () => {
        const input: string = "   \n   \n \n  "
        expect(validateNumberOfCommandLines(input)).toBe(false)
    })
})

describe("Checking that upper rights coordinates can be correctly validated (validateUpperRigthCoordinates)", () => {
    test("Upper right coordinates have the correct format i.e. 2 strictly positive numbers", () => {
        const upperRightCoordinates: string = "25 35"
        expect(validateUpperRightCoordinates(upperRightCoordinates)).toBe(true)
    })
    test("Upper right coordinates have wrong format e.g. 1st number is negative", () => {
        const upperRightCoordinates: string = " -1 2 "
        expect(validateUpperRightCoordinates(upperRightCoordinates)).toBe(false)
    })
    test("Upper right coordinates have wrong format e.g. 2nd number is negative", () => {
        const upperRightCoordinates: string = " 1 -2 "
        expect(validateUpperRightCoordinates(upperRightCoordinates)).toBe(false)
    })
    test("Upper right coordinates have wrong format e.g. 1st number is not an integer", () => {
        const upperRightCoordinates: string = " 10.1 15 "
        expect(validateUpperRightCoordinates(upperRightCoordinates)).toBe(false)
    })
    test("Upper right coordinates have wrong format e.g. 2nd number is not an integer", () => {
        const upperRightCoordinates: string = " 1 15.6 "
        expect(validateUpperRightCoordinates(upperRightCoordinates)).toBe(false)
    })
    test("Upper right coordinates have wrong format - e.g. too many numbers", () => {
        const upperRightCoordinates: string = "25 35 33"
        expect(validateUpperRightCoordinates(upperRightCoordinates)).toBe(false)
    })
    test("Upper right coordinates have wrong format - e.g. empty string", () => {
        const upperRightCoordinates: string = ""
        expect(validateUpperRightCoordinates(upperRightCoordinates)).toBe(false)
    })
    test("Upper right coordinates have wrong format - e.g. numbers and letters", () => {
        const upperRightCoordinates: string = "25 A"
        expect(validateUpperRightCoordinates(upperRightCoordinates)).toBe(false)
    })  
    test("X coordinate is 0", () => {
        const upperRightCoordinates: string = "0 3"
        expect(validateUpperRightCoordinates(upperRightCoordinates)).toBe(false)
    })
    test("Y coordinate is 0", () => {
        const upperRightCoordinates: string = "3 0"
        expect(validateUpperRightCoordinates(upperRightCoordinates)).toBe(false)
    })
})

describe("Checking that rover position string can be validated (validateRoverPosition)", ()=> {
    test("Correct rover position - example 1", () => {
        expect(validateRoverPosition("0 0 N", 10, 20)).toBe(true)
    })
    test("Correct rover position - example 2", () => {
        expect(validateRoverPosition("  20   20    W  ", 25, 20)).toBe(true)
    })
    test("Incorrect rover position - empty string", () => {
        expect(validateRoverPosition("", 25, 2)).toBe(false)
    })
    test("Incorrect rover position - string improperly formatted", () => {
        expect(validateRoverPosition("55N", 5, 5)).toBe(false)
    })
    test("Incorrect rover position - invalid orientation", () => {
        expect(validateRoverPosition("5 5 SW", 5, 5)).toBe(false)
    })
    test("Incorrect rover position - negative X", () => {
        expect(validateRoverPosition("-1 3 N", 25, 2)).toBe(false)
    })
    test("Incorrect rover position - negative Y", () => {
        expect(validateRoverPosition("0 -3 N", 25, 2)).toBe(false)
    })
    test("Incorrect rover position - X is not an integer", () => {
        expect(validateRoverPosition("0.4 3 N", 25, 2)).toBe(false)
    })
    test("Incorrect rover position - Y is not an integer", () => {
        expect(validateRoverPosition("0 3.5 N", 25, 2)).toBe(false)
    })
    test("Incorrect rover position - X > upper right coordinates", () => {
        expect(validateRoverPosition("5 0 N", 4, 3)).toBe(false)
    })
    test("Incorrect rover position - Y > upper right coordinates", () => {
        expect(validateRoverPosition("0 20 N", 4, 4)).toBe(false)
    })
})

describe("Checking that rover instruction string can be validated (validateRoverInstructions)", ()=> {
    test("Correct instructions - empty string", () => {
        expect(validateRoverInstructions(" ")).toBe(true)
    })
    test("Correct instructions - non-empty string", () => {
        expect(validateRoverInstructions("LMRRRRMM")).toBe(true)
    })
    test("Incorrect instructions - illegal character", () => {
        expect(validateRoverInstructions("LMLLLX")).toBe(false)
    })    
    test("Incorrect instructions - whitespace in the middle", () => {
        expect(validateRoverInstructions("LML  LMR")).toBe(false)
    })
})

