# mars-rovers
This is an API to move a squad of Mars rovers on a rectangular plateau. User input defines the dimensions of the plateau, the starting positions of each rover and the instructions for each of them. You can control as many rovers as you want!

All the terminal commands below assume that your working directory is mars-rovers. 
## Installation 

Clone the repository and type in the terminal 
```
npm install
```
## Run tests

### Run only the tests on the API output
In the terminal run
```
npm run test index.test.ts  
```

### Run all the tests
In the terminal run
```
npm run test
```

## Run application
In the terminal run
```
nodemon src/index.ts
```

## Using the API
By default this API runs on http://localhost:3000/. 

To use it, send this **POST** request:
```
POST http://localhost:3000/
```

where the body contains the input for the rovers and is in text/plain format in the following format 

```
5 5       // upper right coordinates of the plateau
1 2 N     // position of the 1st rover - format is X Y [NSWE] where N, S, W and E stand for the 4 points of the compass
RMML      // instruction string for the 1st rover - L to rotate left, M to move forward by 1 unit, R to rotate right
3 3 W     // position of a 2nd rover
          // instructions for the 2nd rover - it can be an empty string if you do not wish to move this rover
2 4 S     // position of a 3rd rover
LLMRM     // instruction for the 3rd rover
....      // you can add as many rovers as you want - but your input must have an odd number of lines and at least 3 lines 
 
```

Here are some possible responses for the API. The response format is JSON

* **All the instructions were executed successfully**

  Input
  ```
  5 5
  1 2 N
  LMLMLMLMM
  3 3 E
  MMRMMRMRRM
  ```
  
  Output
  ```
  Status: 200 OK
  {
    "message": "Rover #1: Instructions complete. Rover #2: Instructions complete. ",
    "finalRoverPositions": [
        "1 3 N",
        "5 1 E"
    ]
   }
  ```
* **No instructions could be executed because the format of the input is incorrect.**
   
  Input
  ```
  5 -4.5
  1 2 N          
  MMMMMMM          
  0 0 E
  MMMLM        
  ```

  Output
  ```
  Status: 400 Bad Request
  {
    "message": "Incorrect input format: upper right coordinates must be 2 strictly positive integers (e.g. '5 4')",
    "finalRoverPositions": []
  } 
  ```
  
* **Some instructions could not be executed because some rovers would have collided.**

  The rovers that would collide stay at their initial positions. The other rovers move normally. 

  Input
  ```
  10 20
  5 4 W   
  LLL
  5 9 E
  RMMMMM
  0 0 N
  MMMMRL
  ```

  Output
  ```
  Status: 400 Bad Request
  {
    "message": "Rover #1: Instructions complete. Rover #2: Another rover is in the way. Stopping the execution of the instructions. Rover #3: Instructions complete. ",
    "finalRoverPositions": [
        "5 4 N",
        "5 9 E",
        "0 4 N"
    ]
  }   
  ```
* **Some instructions could not be executed because some rovers would have gone over the edge of the plateau.**

    The rovers that would fall off a cliff stay at their initial position. The other rovers move normally.
  
  Input
  ```
  5 5
  1 2 N
  MMMMMMM
  0 0 E
  MMMLM
  ```

  Output
  ```
  Status: 400 Bad Request
  {
    "message": "Rover #1: Reached the limit of the plateau. Stopping the execution of the instructions. Rover #2: Instructions complete. ",
    "finalRoverPositions": [
        "1 2 N",
        "3 1 N"
    ]
  }   
  ```

  
