export interface finalRoverStatus {
    roverPosition: string 
    message: string
    instructionsComplete: boolean
}

export interface roversCommands {
    upperRightCoordinates: string 
    roverPositions: Array<string>
    roverInstructions: Array<string>
}

export interface roversOutput {
    message: string
    finalRover1Position: string
    finalRover2Position: string
}