const validateNumberOfCommandLines = (input: string): boolean => {
  // Check that input has an odd numbers of lines and at least 3 lines. 
  const commandsArray: Array<string> = input.split("\n")
  return (commandsArray.length >= 3) && (commandsArray.length % 2 === 1)
}

const validateUpperRightCoordinates = (upperRightCoordinates: string): boolean => {
  // Check that 2 strictly positive integers were given
  
  let upperRightCoordinatesAreValid: boolean = true
  const goodFormat = /^\d+\s\d+$/

  if (goodFormat.test(upperRightCoordinates)) {
    let coordinatesArray: Array<string> = upperRightCoordinates.split(' ')
    upperRightCoordinatesAreValid = (Number(coordinatesArray[0]) > 0 && Number(coordinatesArray[1]) > 0)
  } else {
    upperRightCoordinatesAreValid = false
  }
  return upperRightCoordinatesAreValid
}

const validateRoverPosition = (roverPosition: string, maxPositionX: number, maxPositionY: number): boolean => {
  // Check that rover position has format "integer integer orientation" and that rover is on the plateau
  // Numbers should be consistent with the upper right coordinates and positive
  // Orientation should be N, S, W, or E

  let roverPositionIsValid = true
  const goodFormat = /^\d+\s\d+\s[NSWE]$/

  if (goodFormat.test(roverPosition)) {
    const X = Number(roverPosition.split(' ')[0])
    const Y = Number(roverPosition.split(' ')[1])
    roverPositionIsValid = (X >= 0 && Y >= 0 && X <= maxPositionX && Y <= maxPositionY) 
  } else {
    roverPositionIsValid = false
  }
  return roverPositionIsValid
}

const validateRoverInstructions = (roverInstructions: string): boolean => {
  // Check that roverInstuctions is either an empty string (maybe we don't want to move that rover?)
  // or that it does not countain any other character apart from L, M, and R

  if (roverInstructions === '') {
    return true
  } else {
    const illegalStringFormat = /[^LMR]/
    return !illegalStringFormat.test(roverInstructions)
  }
}

const validateRoverPositionsAgainstCollisions = (roverPositions: Array<string>): boolean => {
  // Check if there are collisions by checking if any rover position (excluding the orientation) appears several times
  // Returns false if there is any collision, true otherwise

  let foundDuplicatedPositions: boolean = false
  const roverPositionsWithoutOrientation: Array<string> = roverPositions.map((roverPosition) => {
    let positionArray = roverPosition.split(' ').slice(0, 2)
    return positionArray.join(' ')
  })

  foundDuplicatedPositions = roverPositionsWithoutOrientation.some((roverPosition, index) => {
    return roverPositionsWithoutOrientation.indexOf(roverPosition) !== index
  })
  return !foundDuplicatedPositions
}

export {
  validateNumberOfCommandLines,
  validateUpperRightCoordinates,
  validateRoverPosition,
  validateRoverPositionsAgainstCollisions,
  validateRoverInstructions
}
