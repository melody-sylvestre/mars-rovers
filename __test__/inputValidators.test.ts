import { validateInputFormat } from '../src/inputValidators'

describe("Checking that input format can be correctly validated", ()=>{
    
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
