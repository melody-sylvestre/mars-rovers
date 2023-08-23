import { validateRoversCommandsFormat } from '../src/inputValidators'

describe("Checking that input format can be correctly validated", ()=>{
    
    test("Input has the correct format", () => {
        const input = {
            upperRightCoordinates: "5 5",
            rover1Position: "1 2 N",
            rover1Instructions: "LMLMLMLMM",
            rover2Position: "3 3 E",
            rover2Instructions: "MMRMMRMRRM"
        }  
        expect(validateRoversCommandsFormat(input)).toBe(true)
    })

})