import { Request, Response } from "express"
import { commandsParser } from "./commandsParser"
import { RoverStatus, roversCommands, roversOutput } from "./interfaces"
import { executeRoverInstructions } from './roversMotions'
import {
  validateNumberOfCommandLines,
  validateRoverInstructions,
  validateRoverPosition,
  validateRoverPositionsAgainstCollisions,
  validateUpperRightCoordinates,
} from "./inputValidators"

const moveMarsRovers = (request: Request, response: Response) => {
  const input: string = request.body.trimStart()
  let output: roversOutput = {
    message: "",
    finalRoverPositions: []
  }
  let statusCode: number = 200

  if (!validateNumberOfCommandLines(input)) {
    output.message =
      "Incorrect input format: commands must have at least 2 lines and an odd number of lines"
    statusCode = 400

  } else {
    const inputCommands: roversCommands = commandsParser(input)
    if (!validateUpperRightCoordinates(inputCommands.upperRightCoordinates)) {
      output.message = "Incorrect input format: upper right coordinates must be 2 strictly positive integers (e.g. '5 4')"
      statusCode = 400

    } else {
      const maxPositionX = Number(inputCommands.upperRightCoordinates.split(' ')[0])
      const maxPositionY = Number(inputCommands.upperRightCoordinates.split(' ')[1])
      const numberOfRovers: number = inputCommands.roverPositions.length
      let foundInvalidPosition: boolean = false
      let foundInvalidInstructions: boolean = false
      let inputFormatIsValid: boolean = true
      let currentRoverStatus: RoverStatus = {
        roverPositions: [""],
        message: "",
        instructionsComplete: false
      }

      for (let i = 0; i < numberOfRovers; i++) {
        if (!validateRoverPosition(inputCommands.roverPositions[i], maxPositionX, maxPositionY)) {
          foundInvalidPosition = true
          output.message = `${output.message}Rover #${i + 1}: Incorrect position. `
        }
        if (!validateRoverInstructions(inputCommands.roverInstructions[i])) {
          foundInvalidInstructions = true
          output.message = `${output.message}Rover #${i + 1}: Incorrect instructions. `
        }
      }

      if (foundInvalidPosition) {
        inputFormatIsValid = false
        statusCode = 400
        output.message = `${output.message}Rover positions must have the format X Y [NSWE] (e.g '1 3 N') with 0 <= X <= ${maxPositionX} and  0 <= Y <= ${maxPositionY}. Both number must be integers. `
      }

      if (foundInvalidInstructions) {
        inputFormatIsValid = false
        statusCode = 400
        output.message = `${output.message}Rover instructions must be an empty string or contains only L, M or R. `
      }

      if (!validateRoverPositionsAgainstCollisions(inputCommands.roverPositions)) {
        inputFormatIsValid = false
        statusCode = 400
        output.message = `${output.message}Some rovers are at the same position!`
      }

      if (inputFormatIsValid) {
        output.finalRoverPositions = [...inputCommands.roverPositions]

        for (let indexRover = 0; indexRover < numberOfRovers; indexRover++) {
          currentRoverStatus = executeRoverInstructions(indexRover, output.finalRoverPositions, inputCommands.roverInstructions[indexRover], maxPositionX, maxPositionY)
          output.message = `${output.message}Rover #${indexRover + 1}: ${currentRoverStatus.message}`
          output.finalRoverPositions = [...currentRoverStatus.roverPositions]
          if (!currentRoverStatus.instructionsComplete) {
            statusCode = 400
          }
        }
      }
    }
  }
  response.status(statusCode).json(output)
}

export { moveMarsRovers };
