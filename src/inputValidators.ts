const validateNumberOfCommandLines = (input: string): boolean => {
  // Check that input has an odd numbers of lines and at least 3 lines. 
  const commandsArray: Array<string> = input.split("\n")
  return (commandsArray.length >= 3) && (commandsArray.length % 2 === 1)
}

const validateUpperRightCoordinates = (upperRightCoordinates: string): boolean => {
  // Check that 2 strictly positive numbers were given

  let upperRightCoordinatesAreValid: boolean = true
  const upperRightCoordinatesClean: string = upperRightCoordinates.trim()
  const goodFormat = /^\d+\s+\d+$/

  if (goodFormat.test(upperRightCoordinatesClean)) {
    const coordinatesAsString: Array<string> = upperRightCoordinatesClean.split(" ")
    upperRightCoordinatesAreValid = (Number(coordinatesAsString[0]) === 0 || Number(coordinatesAsString[1]) === 0) ? false : true
  } else {
    upperRightCoordinatesAreValid = false
  }
  return upperRightCoordinatesAreValid
}

const validateRoverPosition = (roverPosition: string, maxPositionX: number, maxPositionY: number): boolean => {
  // Check that rover position has format number number orientation
  // Numbers should be consistent with upperRightCoordinates and not negative
  // Orientation should be N, S, W, or E

  let roverPositionIsValid = true
  const roverPositionClean: string = roverPosition.trim()
  const goodFormat = /^\d+\s+\d+\s+[NSWE]$/

  if (goodFormat.test(roverPositionClean)) {
    const X = Number(roverPositionClean.split(' ')[0])
    const Y = Number(roverPositionClean.split(' ')[1])
    roverPositionIsValid = (X < 0 || Y < 0 || X > maxPositionX || Y > maxPositionY) ? false : true
  } else {
    roverPositionIsValid = false
  }
  return roverPositionIsValid
}

const validateRoverInstructions = (roverInstructions: string): boolean => {
  // Check that roverInstuctions is either an empty string (maybe we want to move only 1 rover at a time?)
  // or that it does not countain any other character apart from L, M, and R

  const roverInstructionsClean: string = roverInstructions.trim()
  if (roverInstructionsClean === '') {
    return true
  } else {
    const illegalStringFormat = /[^LMR]/
    return illegalStringFormat.test(roverInstructionsClean) ? false : true
  }
}

export { validateNumberOfCommandLines, validateUpperRightCoordinates, validateRoverPosition, validateRoverInstructions }
