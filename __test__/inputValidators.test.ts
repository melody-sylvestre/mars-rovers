import { validateInputFormat, validateUpperRightCoordinates, validateRoverPosition } from '../src/inputValidators'

describe("Checking that input format can be correctly validated (validateInputFormat)", ()=>{
    
    test("Input has the correct format", () => {
        const input = {
            upperRightCoordinates: "5 5",
            rover1Position: "1 2 N",
            rover1Instructions: "LMLMLMLMM",
            rover2Position: "3 3 E",
            rover2Instructions: "MMRMMRMRRM"
        }  
        expect(validateInputFormat(input)).toBe(true)
    })

    test("Input has the wrong number of lines", () => {
        const input = {
            upperRightCoordinates: "5 5",
            rover1Position: "1 2 N",
            rover1Instructions: "LMLMLMLMM",
            rover2Position: "3 3 E",
            rover2Instructions: "MMRMMRMRRM", 
            isMarsCool: "yes",
        }  
        expect(validateInputFormat(input)).toBe(false)
    })

    test("upperRightCoordinates key is missing", () => {
        const input = {
            wrongKey: "5 5",
            rover1Position: "1 2 N",
            rover1Instructions: "LMLMLMLMM",
            rover2Position: "3 3 E",
            rover2Instructions: "MMRMMRMRRM", 
        }  
        expect(validateInputFormat(input)).toBe(false)
    })

    test("rover1Position key is missing", () => {
        const input = {
            upperRightCoordinates: "5 5",
            wrongKey: "1 2 N",
            rover1Instructions: "LMLMLMLMM",
            rover2Position: "3 3 E",
            rover2Instructions: "MMRMMRMRRM"
        }  
        expect(validateInputFormat(input)).toBe(false)
    })
    test("rover1Instructions key is missing", () => {
        const input = {
            upperRightCoordinates: "5 5",
            rover1Position: "1 2 N",
            wrongKey: "LMLMLMLMM",
            rover2Position: "3 3 E",
            rover2Instructions: "MMRMMRMRRM"
        }  
        expect(validateInputFormat(input)).toBe(false)
    })
    test("rover2Position key is missing", () => {
        const input = {
            upperRightCoordinates: "5 5",
            rover1Position: "1 2 N",
            rover1Instructions: "LMLMLMLMM",
            wrongKey: "3 3 E",
            rover2Instructions: "MMRMMRMRRM"
        }  
        expect(validateInputFormat(input)).toBe(false)
    })

    test("rover2Instructions key is missing", () => {
        const input = {
            upperRightCoordinates: "5 5",
            rover1Position: "1 2 N",
            rover1Instructions: "LMLMLMLMM",
            rover2Position: "3 3 E",
            wrongKey: "MMRMMRMRRM"
        }  
        expect(validateInputFormat(input)).toBe(false)
    })
})

describe("Checking that upper rights coordinates can be correctly validated (validateUpperRigthCoordinates)", () => {
    
    test("Upper right coordinates have the correct format i.e. 2 strictly positive numbers", () => {
        const upperRightCoordinates: string = "25 35"
        expect(validateUpperRightCoordinates(upperRightCoordinates)).toBe(true)
    })

    test("Upper right coordinates have the correct format i.e. 2 strictly positive numbers", () => {
        const upperRightCoordinates: string = "1 2"
        expect(validateUpperRightCoordinates(upperRightCoordinates)).toBe(true)
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

describe("Checking that rover position string can be validated (validateRoverPosition", ()=> {
    
    test("Correct rover position - example 1", () => {
        expect(validateRoverPosition("0 0 N", 10, 20)).toBe(true)
    })

    test("Correct rover position - example 2", () => {
        expect(validateRoverPosition("20   20    W", 25, 20)).toBe(true)
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

    test("Incorrect rover position - X > upper right coordinates", () => {
        expect(validateRoverPosition("5 0 N", 4, 3)).toBe(false)
    })

    test("Incorrect rover position - Y > upper right coordinates", () => {
        expect(validateRoverPosition("0 20 N", 4, 4)).toBe(false)
    })
})

