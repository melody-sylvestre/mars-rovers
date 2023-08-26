import { finalRoverStatus } from "./interfaces"
import { validateRoverPosition } from "./inputValidators"

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

const executeRoverInstructions = (initialRoverPosition: string, roverInstructions: string, maxPositionX: number, maxPositionY: number) => {
    // Execute the instructions for a rover starting from its initial position
    // Return the rover final position, a message and a boolean to indicate whether the instructions were executed successfully

    const roverInstructionsArray: Array<string> = roverInstructions.split("")
    let roverStatus: finalRoverStatus = {
        roverPosition: initialRoverPosition,
        message: "",
        instructionsComplete: true
    }
    let newRoverPosition: string = ""

    for (let i = 0; i < roverInstructionsArray.length; i++) {
        switch (roverInstructionsArray[i]) {
            case 'M':
                newRoverPosition = move(roverStatus.roverPosition)
                if (validateRoverPosition(newRoverPosition, maxPositionX, maxPositionY)) {
                    roverStatus.roverPosition = newRoverPosition
                } else {
                    roverStatus.instructionsComplete = false
                    roverStatus.message = "Reached the limit of the plateau. Stopping the execution of the instructions."
                    break
                }
                break
            case 'L':
                roverStatus.roverPosition = rotate(roverStatus.roverPosition, 'L')
                break
            case 'R':
                roverStatus.roverPosition = rotate(roverStatus.roverPosition, 'R')
                break
        }
    }
    if (roverStatus.instructionsComplete) {
        roverStatus.message = 'Instructions complete.'
    }
    return roverStatus
}


export { move, rotate, executeRoverInstructions }      