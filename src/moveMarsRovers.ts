import {Request, Response} from 'express'
import { roversOutput } from './interfaces'
import { validateInputFormat } from './inputValidators'

//implement true / false validation instead of exceptions
const moveMarsRovers = (request:Request, response:Response) => {
    let input:any = request.body
    
    if(!validateInputFormat(input)) {
        const output: roversOutput = 
        {
            message: "Incorrect input format: commands should have exactly 5 lines and the following keys: upperRightCoordinates,  rover1Position, rover1Instructions, rover2Position, rover2Instructions",  
            finalRover1Position: "", 
            finalRover2Position: ""
        }
        response.status(400).json(output)      
    } else {
        response.status(200).send('OK') 
    }

//    response.sendStatus(200)

    // parse json body into object roversCommands -> try / catch if it's the wrong format
    // validate input 
        // check for negative or number for upper rights coords
        // check for negative number and illegal characters for rovers position 
        // check for illegal moves (e.g X)
    // send rovers positions as response and messages , 
}

export { moveMarsRovers }