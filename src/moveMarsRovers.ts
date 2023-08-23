import {Request, Response} from 'express'
import { roversCommands, roversOutput } from './interfaces'
import { validateRoversCommandsFormat } from './inputValidators'

const moveMarsRovers = (request:Request, response:Response) => {
    let input:any = request.body
    
    try {
       const commandsAreValid:boolean = validateRoversCommandsFormat(input)    
    } catch (exception) {
        const output: roversOutput = 
        {
            message: exception, 
            finalRover1Position: "", 
            finalRover2Position: ""
        }
        response.status(400).json(output)   
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