import { validateInputFormat, validateUpperRightCoordinates } from '../src/inputValidators'

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

