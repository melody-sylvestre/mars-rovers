import { Request, Response } from "express"
import { finalRoverStatus, roversCommands, roversOutput } from "./interfaces"
import {
  validateNumberOfCommandLines,
  validateRoverInstructions,
  validateRoverPosition,
  validateUpperRightCoordinates,
} from "./inputValidators";
import { commandsParser } from "./commandsParser"
import { executeRoverInstructions } from './roversMotions'
import { parseCommandLine } from "typescript";

const moveMarsRovers = (request: Request, response: Response) => {
  const input: string = request.body.trim()
  let output: roversOutput = {
    message: "",
    finalRover1Position: "",
    finalRover2Position: ""
  }
  let statusCode: number = 200

  if (!validateNumberOfCommandLines(input)) {
    output.message =
      "Incorrect input format: commands should at least 2 lines and an odd number of lines"
    statusCode = 400
  } else {
    const inputCommands: roversCommands = commandsParser(input)
    if (!validateUpperRightCoordinates(inputCommands.upperRightCoordinates)) {
      output.message = "Incorrect input format: upperRightCoordinates should be 2 strictly positive numbers (e.g. '5 5')"
      statusCode = 400
    
    } else {
      const maxPositionX = Number(inputCommands.upperRightCoordinates.split(' ')[0])
      const maxPositionY = Number(inputCommands.upperRightCoordinates.split(' ')[1])
      const numberOfRovers: number = inputCommands.roverPositions.length
      let foundInvalidPosition: boolean = false
      let foundInvalidInstructions: boolean = false

      for (let i = 0; i < numberOfRovers; i++) {
        // validate Rovers Positions format
        if (!validateRoverPosition(inputCommands.roverPositions[i], maxPositionX, maxPositionY)) {
          statusCode = 400
          foundInvalidPosition = true
          output.message = `${output.message}Rover #${i + 1}: Incorrect position. `
        }
        
        if (!validateRoverInstructions(inputCommands.roverInstructions[i])) {
          statusCode = 400
          foundInvalidInstructions = true
          output.message = `${output.message}Rover #${i + 1}: Incorrect instructions. `
        }  
      }

      if( foundInvalidPosition ){
        output.message = `${output.message}Rover positions must have the format X Y [NSWE] (e.g '1 3 N') with 0 <= X <= ${maxPositionX} and  0 <= Y <= ${maxPositionY}. Both number must be integers. `
      }
      if( foundInvalidInstructions ){
       output.message = `${output.message}Rover instructions must be an empty string or contains only L, M or R. `
      }

      // validate rovers positions against collisions -> check duplicates
      if( !foundInvalidPosition && !foundInvalidInstructions )
        output.message = 'OK'
    }
  }
  response.status(statusCode).json(output)
}


// } else if (!validateUpperRightCoordinates(input.upperRightCoordinates)) {
//   output.message = "Incorrect input format: upperRightCoordinates should be 2 strictly positive numbers (e.g. '5 5')"
//   statusCode = 400
// } else {
//   const maxPositionX = Number(input.upperRightCoordinates.trim().split(' ')[0])
//   const maxPositionY = Number(input.upperRightCoordinates.trim().split(' ')[1])

//   if (!validateRoverPosition(input.rover1Position, maxPositionX, maxPositionY)) {
//     output.message = `Incorrect Rover 1 position: rover1Position should have the format X Y [NSWE] (e.g 1 3 N) with 0 <= X <= ${maxPositionX} and  0 <= Y <= ${maxPositionY}`
//     statusCode = 400

//   } else if (!validateRoverPosition(input.rover2Position, maxPositionX, maxPositionY)) {
//     output.message = `Incorrect Rover 2 position: rover2Position should have the format X Y [NSWE] (e.g 1 3 N) with 0 <= X <= ${maxPositionX} and  0 <= Y <= ${maxPositionY}`
//     statusCode = 400

//   } else if (!validateRoverInstructions(input.rover1Instructions)) {
//     output.message = "Incorrect Rover 1 instructions: rover1Instructions should be an empty string or contains only L, M or R"
//     statusCode = 400

//   } else if (!validateRoverInstructions(input.rover2Instructions)) {
//     output.message = "Incorrect Rover 2 instructions: rover2Instructions should be an empty string or contains only L, M or R"
//     statusCode = 400

//   } else {
//     const rover1Position: string = input.rover1Position.trim()
//     const rover2Position: string = input.rover2Position.trim()
//     const rover1Instructions: string = input.rover1Instructions.trim()
//     const rover2Instructions: string = input.rover2Instructions.trim()

//     const rover1FinalStatus: finalRoverStatus = executeRoverInstructions(rover1Position, rover1Instructions, maxPositionX, maxPositionY)

//     const rover2FinalStatus: finalRoverStatus = executeRoverInstructions(rover2Position, rover2Instructions, maxPositionX, maxPositionY)

//     output.message = `Rover1: ${rover1FinalStatus.message} Rover2: ${rover2FinalStatus.message}`
//     output.finalRover1Position = rover1FinalStatus.roverPosition
//     output.finalRover2Position = rover2FinalStatus.roverPosition

//     statusCode = (rover1FinalStatus.instructionsComplete && rover2FinalStatus.instructionsComplete) ? 200 : 400
//   }



export { moveMarsRovers };
