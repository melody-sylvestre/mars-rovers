export interface RoverStatus {
    roverPositions: Array<string> 
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
    finalRoverPositions: Array<string>
}