import { roversCommands } from "./interfaces"

const validateRoversCommandsFormat = (input: any): boolean => {
    // check that the input has the right number of lines and the right keys
    if( Object.keys(input).length !==5 ) {
        throw "Invalid input format: rovers commands should have exactly 5 lines"
    } else {
        const requiredFields = [
            "upperRightCoordinates", 
            "rover1Position", 
            "rover1Instructions", 
            "rover2Position", 
            "rover2Instructions",
        ]
        
        for (let i = 0; i < requiredFields.length; i++ ) {
            if( !input.hasOwnProperty(requiredFields[i])) {
                throw `Invalid input format: rovers commands should include the line ${requiredFields[i]}`
            }
        }
    }       

    return true
}

export { validateRoversCommandsFormat }