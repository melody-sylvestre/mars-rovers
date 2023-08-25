const move = (roverPosition: string): string => {
    // Move the rover by 1 unit along following its orientation

    const roverPositionArray: Array<string> = roverPosition.split(' ')
    let X: number = Number(roverPositionArray[0])
    let Y: number = Number(roverPositionArray[1])
    const orientation: string = roverPositionArray[2]
    
    switch( orientation ) {
        case 'N':
            Y = Y + 1
            break
        case 'S':
            Y = Y - 1
            break
        case 'E':
            X = X + 1 
            break
        case 'W':
            X = X - 1
            break
    }
    return `${X} ${Y} ${orientation}` 
}

const rotate = (roverPosition: string, direction: string): string => {
    // split rover position 
    // orientation = roverPosition[2]
    // orientations = [N,E,S,W]
     // index = orientations.indexof(orientation)
    // if L
     // newOrientation = index===0? orientations[3] : orientations[index-1]  

    // if R
    // 
    // newOrientation = index===3? orientations[0] : orientations[index+1]  
     return `X Y newOrientation`
} 

export { move, rotate}      