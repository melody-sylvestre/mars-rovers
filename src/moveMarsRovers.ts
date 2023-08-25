import { Request, Response } from "express";
import { roversOutput } from "./interfaces";
import {
  validateInputFormat,
  validateRoverInstructions,
  validateRoverPosition,
  validateUpperRightCoordinates,
} from "./inputValidators";
import { move, rotate } from './roversMotions'

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
  } else if (!validateUpperRightCoordinates(input.upperRightCoordinates)) {
    output.message = "Incorrect input format: upperRightCoordinates should be 2 strictly positive numbers (e.g. '5 5')"
    statusCode = 400
  } else {
    const maxPositionX = Number(input.upperRightCoordinates.trim().split(' ')[0])
    const maxPositionY = Number(input.upperRightCoordinates.trim().split(' ')[1])

    if (!validateRoverPosition(input.rover1Position, maxPositionX, maxPositionY)) {
      output.message = `Incorrect Rover 1 position: rover1Position should have the format X Y [NSWE] (e.g 1 3 N) with 0 <= X <= ${maxPositionX} and  0 <= Y <= ${maxPositionY}`
      statusCode = 400

    } else if (!validateRoverPosition(input.rover2Position, maxPositionX, maxPositionY)) {
      output.message = `Incorrect Rover 2 position: rover2Position should have the format X Y [NSWE] (e.g 1 3 N) with 0 <= X <= ${maxPositionX} and  0 <= Y <= ${maxPositionY}`
      statusCode = 400

    } else if (!validateRoverInstructions(input.rover1Instructions)) {
      output.message = "Incorrect Rover 1 instructions: rover1Instructions should be an empty string or contains only L, M or R"
      statusCode = 400

    } else if (!validateRoverInstructions(input.rover2Instructions)) {
      output.message = "Incorrect Rover 2 instructions: rover2Instructions should be an empty string or contains only L, M or R"
      statusCode = 400

    } else {
      // initialise position of rovers (trim positions)
      let rover1Position: string = input.rover1Position.trim()
      let rover2Position: string = input.rover2Position.trim() 
      let newPosition: string = ""

      // initialise instruction chains (trim) and split into arrays 
      let rover1Instructions: Array<string> = input.rover1Instructions.trim().split(' ')
      let rover2Instructions: Array<string> = input.rover2Instructions.trim().split(' ')

      //TODO: consider creating a function for this?  

      // loop on instructions rover1:
      for (let i = 0; i < rover1Instructions.length; i++ ){
      // switch on letter 
      //  if M -> call newPosition = function moveRover(roverPosition: string):string
      //        -> if(validateRoverPosition(newPosition))
      //            -> if OK roverposition = newPosition  
      //             -> else: statusCode=400, outputmessage: Rover1 reached the limit of the plateau break loop and position should stay the same
        switch(rover1Instructions[i]){
          case 'M': 
            newPosition = move(rover1Position)
            if( validateRoverPosition(newPosition, maxPositionX, maxPositionY) ){
              rover1Position = newPosition
            } else {
              statusCode = 400
              output.message = "Rover 1 reached the limit of the plateau. Stopping the execution of rover 1 instructions."
              break
            }
            break
           //  if L -> call function position = rotate(roverPosition: string, direction): string with option L
          //  if R -> call function rotate with option R (same as above)
          case 'L': 
            rover1Position = rotate(rover1Position, 'L')
            break
          
          case 'R':
            rover1Position = rotate(rover1Position, 'R')
            break
        }
      }
    
      // checking that rover1 instructions were complete
      //   if status code !=400 -> statusCode = 200, message = Rover1 instructions complete
      if( statusCode !==400 ) {
        output.message = 'Rover 1 instructions complete.'
      }
      output.finalRover1Position = rover1Position
     
      // loop on instructions rover2:
      for (let i = 0; i < rover2Instructions.length; i++ ){
        // switch on letter 
        //  if M -> call newPosition = function moveRover(roverPosition: string):string
        //        -> if(validateRoverPosition(newPosition))
        //            -> if OK roverposition = newPosition  
        //             -> else: statusCode=400, outputmessage: Rover1 reached the limit of the plateau break loop and position should stay the same
          switch(rover2Instructions[i]){
            case 'M': 
              newPosition = move(rover2Position)
              if( validateRoverPosition(newPosition, maxPositionX, maxPositionY) ){
                rover2Position = newPosition
              } else {
                statusCode = 400
                output.message = output.message.concat(' ', 'Rover 2 reached the limit of the plateau. Stopping the execution of rover 2 instructions.')
                break
              }
              break
             //  if L -> call function position = rotate(roverPosition: string, direction): string with option L
            //  if R -> call function rotate with option R (same as above)
            case 'L': 
              rover2Position = rotate(rover2Position, 'L')
              break
            case 'R':
              rover2Position = rotate(rover2Position, 'R')
              break
          }
        }
      
        // checking that rover2 instructions were complete
        //   if status code !=400 -> statusCode = 200, message = Rover2 instructions complete
        if( statusCode !==400 ) {
          output.message = output.message.concat(' ', 'Rover 2 instructions complete.')
        }
        output.finalRover2Position = rover2Position
      
    }
  }
  response.status(statusCode).json(output)

};

export { moveMarsRovers };
