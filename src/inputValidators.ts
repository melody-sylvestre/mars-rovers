const validateInputFormat = (input: any): boolean => {
  // Check that input has the right number of lines and right keys

  if (Object.keys(input).length !== 5) {
    return false;
  } else {
    const requiredFields = [
      "upperRightCoordinates",
      "rover1Position",
      "rover1Instructions",
      "rover2Position",
      "rover2Instructions",
    ];

    for (let i = 0; i < requiredFields.length; i++) {
      if (!input.hasOwnProperty(requiredFields[i])) {
        return false;
      }
    }
  }

  return true;
};

const validateUpperRightCoordinates = (upperRightCoordinates: string): boolean => {
  // Checking that 2 strictly positive numbers were given

  let upperRightCoordinatesAreValid: boolean = true;
  const format = /^\d+\s+\d+$/;

  if( format.test(upperRightCoordinates )) {
    const coordinatesAsString: Array<string> = upperRightCoordinates.split(" ");
    for (let i = 0; i < coordinatesAsString.length; i++) {
      if (Number(coordinatesAsString[i]) === 0) {
        upperRightCoordinatesAreValid = false;
      }
    }
  } else {
    upperRightCoordinatesAreValid = false;
  }

  return upperRightCoordinatesAreValid;
};

const validateRoverPosition = (roverPosition:string, maxPositionX: number, maxPositionY: number): boolean => {
  // Check that rover position has format number number orientation
  // Numbers should be consistent with upperRightCoordinates and not negative
  // Orientation should be N, S, W, or E

  let roverPositionIsValid = true
  
  const format = /^\d+\s+\d+\s+[NSWE]$/
  
  if( format.test(roverPosition) ) {
    const X = Number(roverPosition.split(' ')[0])
    const Y = Number(roverPosition.split(' ')[1])
    roverPositionIsValid = ( X < 0 || Y < 0 || X > maxPositionX || Y > maxPositionY)? false: true 
  } else {
    roverPositionIsValid = false 
  }
  return roverPositionIsValid
} 

export { validateInputFormat, validateUpperRightCoordinates, validateRoverPosition };
