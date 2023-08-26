import { roversCommands } from "./interfaces"
import { executeRoverInstructions } from "./roversMotions"

const commandsParser = (input: string): roversCommands => {
    // Break input string into an object containing the upper right coordinates, an Array of the rovers'initial positions
    // and an array of rovers instructions  

    const inputArray: Array<string> = input.split('\n')
    const commands: roversCommands = {
        upperRightCoordinates: inputArray[0].trim(), 
        roverPositions: [],
        roverInstructions: []
    }

    inputArray.slice(1).forEach((line, index) => {
        if( index % 2 === 0 ){
            commands.roverPositions.push(line.trim())
        } else {
            commands.roverInstructions.push(line.trim())
        }
    })
    return commands
}

export { commandsParser }