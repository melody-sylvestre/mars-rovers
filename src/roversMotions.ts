import { RoverStatus } from "./interfaces"
import { validateRoverPosition, validateRoverPositionsAgainstCollisions } from "./inputValidators"

const move = (roverPosition: string): string => {
    // Move the rover by 1 unit along following its orientation
    //Returns the new position of the Rover

    const roverPositionArray: Array<string> = roverPosition.split(' ')
    let X: number = Number(roverPositionArray[0])
    let Y: number = Number(roverPositionArray[1])
    const orientation: string = roverPositionArray[2]

    switch (orientation) {
        case 'N':
            Y = Y + 1
            break
        case 'S':
            Y = Y - 1
            break
        case 'E':
            X = X + 1
            break
        case 'W':
            X = X - 1
            break
    }
    return `${X} ${Y} ${orientation}`
}

const rotate = (roverPosition: string, direction: string): string => {
    //Change the orientation of the rover following the specified direction
    //Returns the new position of the Rover

    const roverPositionArray: Array<string> = roverPosition.split(' ')
    const X: string = roverPositionArray[0]
    const Y: string = roverPositionArray[1]
    let orientation: string = roverPositionArray[2]
    const orientationsArray: Array<string> = ['N', 'E', 'S', 'W']
    const index: number = orientationsArray.indexOf(orientation)
    let newOrientation: string = ""

    if (direction === 'L') {
        newOrientation = index === 0 ? orientationsArray[3] : orientationsArray[index - 1]
    } else if (direction === 'R') {
        newOrientation = index === 3 ? orientationsArray[0] : orientationsArray[index + 1]
    }
    return `${X} ${Y} ${newOrientation}`
}

const executeRoverInstructions = (indexRover: number, initialRoverPositions: Array<string>, roverInstructions: string, maxPositionX: number, maxPositionY: number): RoverStatus => {
    // Execute the instructions for a rover starting from its initial position
    // Takes into account the positions of all the rovers and the edges of the plateau. 
    // Return the updated rovers positions array, a message and a boolean to indicate whether the instructions were executed successfully
    // If instructions were not successful (because the rover would meet an edge of the plateau or another rover), the rovers position array remains unchanged. 

    const roverInstructionsArray: Array<string> = roverInstructions.split("")
    let finalRoverStatus: RoverStatus = {
        roverPositions: [],
        message: "",
        instructionsComplete: true
    } 
    let virtualRoverPositions: Array<string> = [...initialRoverPositions]
    let newRoverPositions: Array<string> = [...initialRoverPositions]

    for (let i = 0; i < roverInstructionsArray.length; i++) {
        switch (roverInstructionsArray[i]) {
            case 'M':
                newRoverPositions[indexRover] = move(virtualRoverPositions[indexRover])
                if( validateRoverPosition(newRoverPositions[indexRover], maxPositionX, maxPositionY) ) {
                    if( validateRoverPositionsAgainstCollisions(newRoverPositions)){
                        virtualRoverPositions = [...newRoverPositions]
                    } else {
                        finalRoverStatus.instructionsComplete = false
                        finalRoverStatus.message = "Another rover is in the way. Stopping the execution of the instructions. "
                        break
                    }                 
                } else {
                    finalRoverStatus.instructionsComplete = false
                    finalRoverStatus.message = "Reached the limit of the plateau. Stopping the execution of the instructions. "
                    break
                }
                break
            case 'L':
                virtualRoverPositions[indexRover] = rotate(virtualRoverPositions[indexRover], 'L')
                break
            case 'R':
               virtualRoverPositions[indexRover] = rotate(virtualRoverPositions[indexRover], 'R')
                break
        }
    }
    if (finalRoverStatus.instructionsComplete) {
        finalRoverStatus.message = 'Instructions complete. '
        finalRoverStatus.roverPositions = [...virtualRoverPositions]
    } else {
        finalRoverStatus.roverPositions = [...initialRoverPositions]
    }
    return finalRoverStatus
}


export { move, rotate, executeRoverInstructions }      