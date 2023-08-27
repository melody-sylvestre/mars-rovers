import { roversCommands } from "./interfaces"

const commandsParser = (input: string): roversCommands => {
    /**
     * Break input string and return an object containing the upper right coordinates, an Array of the rovers' initial positions
    and an array of rovers instructions  
    Spurious whitespaces are removed
    * @param {string} input - user's commands as a block of text
    */ 
    
    const inputArray: Array<string> = input.split('\n')
    const commands: roversCommands = {
        upperRightCoordinates: inputArray[0].trim().replaceAll(/\s{2,}/g, ' '), 
        roverPositions: [],
        roverInstructions: []
    }

    inputArray.slice(1).forEach((line, index) => {
        if( index % 2 === 0 ){
            commands.roverPositions.push(line.trim().replaceAll(/\s{2,}/g, ' '))
        } else {
            commands.roverInstructions.push(line.trim())
        }
    })
    return commands
}

export { commandsParser }