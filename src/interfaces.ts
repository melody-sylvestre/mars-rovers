export interface roversOutput {
    message: string
    finalRover1Position: string
    finalRover2Position: string
}

export interface finalRoverStatus {
    roverPosition: string 
    message: string
    instructionsComplete: boolean
}