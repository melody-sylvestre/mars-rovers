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

    test("Input has too many lines", () => {
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

    test("One of the keys is missing", () => {
        const input = {
            rover1Position: "1 2 N",
            rover1Instructions: "LMLMLMLMM",
            rover2Position: "3 3 E",
            rover2Instructions: "MMRMMRMRRM"
        }  
        expect(validateInputFormat(input)).toBe(true)
    })
})
