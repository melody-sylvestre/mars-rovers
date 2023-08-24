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

  if (format.test(upperRightCoordinates)) {
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

export { validateInputFormat, validateUpperRightCoordinates };
