import { Request, Response } from "express";
import { roversCommands, roversOutput } from "./interfaces";
import {
  validateInputFormat,
  validateRoverInstructions,
  validateRoverPosition,
  validateUpperRightCoordinates,
} from "./inputValidators";

const moveMarsRovers = (request: Request, response: Response) => {
  let input: any = request.body;
  let output: roversOutput = {
    message: "",
    finalRover1Position: "",
    finalRover2Position: ""
  }
  let statusCode: number = 200

  if (!validateInputFormat(input)) {
    output.message =
      "Incorrect input format: commands should have exactly 5 lines and the following keys: upperRightCoordinates,  rover1Position, rover1Instructions, rover2Position, rover2Instructions"
      statusCode = 400
  } else if ( !validateUpperRightCoordinates(input.upperRightCoordinates) ) {
        output.message= "Incorrect input format: upperRightCoordinates should be 2 strictly positive numbers (e.g. '5 5')"
        statusCode = 400
  } else {
      const maxPositionX = Number(input.upperRightCoordinates.split(' ')[0])
      const maxPositionY = Number(input.upperRightCoordinates.split(' ')[1])
      
      if ( !validateRoverPosition(input.rover1Position, maxPositionX, maxPositionY)) {
         output.message = `Incorrect Rover 1 position: rover1Position should have the format X Y [NSWE] (e.g 1 3 N) with 0 <= X <= ${maxPositionX} and  0 <= Y <= ${maxPositionY}`
         statusCode = 400 
      } else if ( !validateRoverPosition(input.rover2Position, maxPositionX, maxPositionY)) {
        output.message = `Incorrect Rover 2 position: rover2Position should have the format X Y [NSWE] (e.g 1 3 N) with 0 <= X <= ${maxPositionX} and  0 <= Y <= ${maxPositionY}`
        statusCode = 400
      } else if ( !validateRoverInstructions(input.rover1Instructions) ){
        output.message = "Incorrect Rover 1 instructions: rover1Instructions should be an empty string or contains only L, M or R"
        statusCode = 400
      } else if ( !validateRoverInstructions(input.rover2Instructions) ){
        output.message = "Incorrect Rover 2 instructions: rover2Instructions should be an empty string or contains only L, M or R"
        statusCode = 400
      } else {
        output.message = "OK"
        statusCode = 200
      }

}

  response.status(statusCode).json(output)

    // parse json body into object roversCommands -> try / catch if it's the wrong format
    // validate input
    // check for negative or number for upper rights coords
    // check for negative number and illegal characters for rovers position
    // check for illegal moves (e.g X)
    // send rovers positions as response and messages ,
  };

  export { moveMarsRovers };
