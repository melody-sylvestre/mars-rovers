import { roversCommands } from "./interfaces"
const validateInputFormat = (input: any): boolean => {
// Check that input has the right number of lines and right keys
    
    if( Object.keys(input).length !==5 ) {
        return false
    
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
                return false 
            }
        }
    }       

    return true
}

export { validateInputFormat }